# Product Brander AI

A full-stack MVP for generating branded product images and names using AI.  
Built with **FastAPI** (backend) and **Next.js** (frontend), leveraging OpenAI and Stability APIs.

---

## Features

- Upload product images
- Generate branded names and marketing copy using AI
- Generate branded product images using Stability API
- Download generated images and results

---

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, TypeScript
- **Backend:** FastAPI, Pydantic, OpenAI, Stability API
- **Other:** Python-dotenv, Requests, Aiofiles

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Python 3.8
- [OpenAI API Key](https://platform.openai.com/)
- [Stability API Key](https://platform.stability.ai/)

---

### Backend Setup

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

### Frontend Setup

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

## License

This project is for demonstration purposes only.
