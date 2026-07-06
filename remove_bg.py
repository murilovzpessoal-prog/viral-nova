import sys
try:
    from PIL import Image
    
    # Open the downloaded image
    img = Image.open('public/logo.png').convert("RGBA")
    datas = img.getdata()

    newData = []
    # Convert white (or near white) to transparent
    for item in datas:
        # Check if the pixel is white or very bright grey
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0)) # Transparent
        else:
            newData.append(item)

    img.putdata(newData)
    img.save("public/logo.png", "PNG")
    print("Background removed successfully.")
except ImportError:
    print("PIL is not installed. Please install pillow (pip install pillow) to process the image.")
except Exception as e:
    print(f"Error processing image: {e}")
