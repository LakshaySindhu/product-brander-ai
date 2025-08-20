PROMPT_TEMPLATES = {
    "electronics": (
        "Create a professional branding image for {description}. "
        "Show the product in a sleek, modern setting with premium lighting. "
        "Emphasize technology, innovation, and durability. "
        "Use a clean, minimal, ecommerce-ready background. "
        "Avoid any distortion of the product design."
    ),
    "fashion": (
        "Generate a stylish branding image for {description}. "
        "Use a fashion-forward lifestyle context with premium lighting. "
        "Aspirational, high-end ecommerce look. "
        "Keep product accuracy while highlighting elegance and desirability."
    ),
    "beauty": (
        "Design a branding image for {description}. "
        "Use luxurious, soft-toned settings with natural textures (marble, flowers, water). "
        "Convey freshness, purity, and elegance. "
        "Ensure the product looks premium and ecommerce-ready."
    ),
    "food": (
        "Generate a branding image for {description}. "
        "Use a vibrant, appetizing setting with natural lighting. "
        "Highlight freshness, taste, and quality with minimal clutter."
    ),
    "home_decor": (
        "Create a branding image for {description}. "
        "Place it in a cozy, modern home scene with warm lighting. "
        "Highlight usability, comfort, and minimal aesthetic."
    ),
    "fitness": (
        "Design a dynamic branding image for {description}. "
        "Energetic, athletic setting that conveys strength and performance. "
        "Bold lighting and colors; ecommerce-ready."
    ),
}

STYLE_MODIFIERS = {
    "photorealistic": ", photorealistic, hyper-detailed, 8K, high quality",
    "cinematic": ", cinematic lighting, dramatic, movie still, sharp focus",
    "anime": ", anime style, vibrant, from a high-quality anime, detailed",
    "minimalist": ", minimalist style, clean lines, simple background, studio lighting"
}

def get_prompt(category: str, description: str, style: str) -> str:
    """
    Retrieves a prompt template, formats it, and appends a style modifier.
    """
    template = PROMPT_TEMPLATES.get(category.lower(), (
        "Generate a professional ecommerce branding image for {description}. "
        "Use premium lighting and a clean, minimal background. "
        "Focus on clarity, desirability, and commercial appeal while preserving product accuracy."
    ))
    
    # Format the base prompt with the user's description
    prompt = template.format(description=description)

    # Append the style modifier if a valid style is chosen
    modifier = STYLE_MODIFIERS.get(style.lower())
    if modifier:
        prompt += modifier
        
    return prompt