import os
import uuid
import requests
import aiofiles
from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from prompts import get_prompt

# Load environment variables
load_dotenv()

app = FastAPI()

# --- CORS Configuration ---
allowed_origin = os.getenv("ALLOWED_ORIGIN")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[allowed_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Directory Setup ---
UPLOADS_DIR = "uploads"
GENERATED_DIR = "generated_images"
os.makedirs(UPLOADS_DIR, exist_ok=True)
os.makedirs(GENERATED_DIR, exist_ok=True)

# --- Serve Generated Images Statically ---
app.mount("/generated", StaticFiles(directory=GENERATED_DIR), name="generated")

# --- Stability AI Configuration ---
STABILITY_API_KEY = os.getenv("STABILITY_API_KEY")
if not STABILITY_API_KEY:
    raise ValueError("STABILITY_API_KEY environment variable not set.")

@app.post("/generate-branding-image")
async def generate_branding_image(
    file: UploadFile = File(...),
    description: str = Form(...),
    category: str = Form(...),
    size: str = Form("1:1"),
    style: str = Form("none")
):
    # --- Save Uploaded File (Logic remains the same) ---
    try:
        file_extension = os.path.splitext(file.filename)[1]
        unique_upload_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(UPLOADS_DIR, unique_upload_filename)
        async with aiofiles.open(file_path, 'wb') as out_file:
            content = await file.read()
            await out_file.write(content)
    except Exception as e:
        print(f"Warning: Could not save uploaded file. Error: {e}")

    # --- Generate Prompt (Now includes style) ---
    final_prompt = get_prompt(category, description, style)

    # --- Call Stability AI API (Updated with aspect_ratio) ---
    try:
        response = requests.post(
            "https://api.stability.ai/v2beta/stable-image/generate/core",
            headers={
                "authorization": f"Bearer {STABILITY_API_KEY}",
                "accept": "image/*"
            },
            files={"none": ''},
            data={
                "prompt": final_prompt,
                "output_format": "png",
                "aspect_ratio": size
            },
        )

        if response.status_code != 200:
            raise Exception(str(response.json()))

        # --- Save and Serve the Generated Image ---
        unique_generated_filename = f"{uuid.uuid4()}.png"
        generated_image_path = os.path.join(GENERATED_DIR, unique_generated_filename)
        
        with open(generated_image_path, "wb") as f:
            f.write(response.content)
        
        base_url = "http://localhost:8000" 
        image_url = f"{base_url}/generated/{unique_generated_filename}"

    except Exception as e:
        print(f"Stability AI API Error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate image. Error: {str(e)}")

    # --- Return Response ---
    return {
        "status": "success",
        "prompt": final_prompt,
        "branding_image_url": image_url,
    }