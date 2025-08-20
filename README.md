# Product Brander AI 

Product Brander AI is a full-stack web application designed to help e-commerce sellers instantly create professional, high-quality branding images. Users can upload a product photo, provide a short description, and select a category, style, and size to generate a unique, AI-powered image perfect for marketing and online stores.

[Image of the Product Brander AI application interface]

## Features

-   **Image Upload**: Upload your existing product photos (JPG/PNG).
-   **AI-Powered Generation**: Leverages Stability AI's powerful text-to-image models.
-   **Customizable Prompts**: The backend uses category-specific templates to generate effective prompts.
-   **Style Selection**: Choose from various creative styles like Photorealistic, Cinematic, and Minimalist.
-   **Size Options**: Generate images in different aspect ratios (Square, Landscape, Portrait).
-   **Simple UI**: A clean and intuitive interface built with Next.js and Tailwind CSS.
-   **Local Image Serving**: The backend saves and serves generated images for immediate download.

---

## Tech Stack

This project is a monorepo containing a separate frontend and backend.

-   **Backend**:
    -   **Framework**: FastAPI
    -   **Language**: Python
    -   **AI Service**: Stability AI API
    -   **Server**: Uvicorn

-   **Frontend**:
    -   **Framework**: Next.js (App Router)
    -   **Language**: TypeScript
    -   **Styling**: Tailwind CSS
    -   **UI Components**: React

---

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

-   **Node.js** (v18 or later)
-   **Python** (v3.8 or later)
-   A **Stability AI API Key** (get one for free from the [Stability AI Platform](https://platform.stability.ai/))

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/product-brander-ai.git](https://github.com/your-username/product-brander-ai.git)
cd product-brander-ai

### 2. Backend Setup

1. **Install dependencies:**
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

2. **Configure environment variables:**  
   Create a `.env` file in `/backend`:
    ```
    OPENAI_API_KEY=your_openai_api_key
    STABILITY_API_KEY=your_stability_api_key
    ALLOWED_ORIGIN=http://localhost:3000
    ```

3. **Run the FastAPI server:**
    ```bash
    uvicorn main:app --reload
    ```

---

### 3. Frontend Setup

1. **Install dependencies:**
    ```bash
    cd frontend
    npm install
    ```

2. **Configure environment variables:**  
   Create a `.env.local` file in `/frontend` if needed.

3. **Run the Next.js app:**
    ```bash
    npm run dev
    ```

---

## Project Structure

```
product-brander-mvp/
├── backend/
│   ├── main.py
│   ├── prompts.py
│   ├── requirements.txt
│   ├── .env
│   ├── uploads/
│   └── generated_images/
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── ...
```

---

## Usage

- Go to [http://localhost:3000](http://localhost:3000)
- Upload a product image and generate branded content

---

## Future Improvements 


- Cloud Storage: Integrate AWS S3 or Supabase Storage for uploaded and generated images.

- User Authentication: Add user accounts to save generation history.

- Database Integration: Store metadata about each generated image in a database like PostgreSQL or SQLite.

- Advanced Editing: Implement image-to-image features like inpainting or outpainting.
