import json
import os
import base64

def save_vars(vars):
  with open('data/vars.json', 'w') as file:
    json.dump(vars, file, indent=2)  # Using indent for pretty-printing

def load_vars():
  with open('data/vars.json', 'r') as file:
    return json.load(file)

def get_png_images_as_base64(directory):
  """
  Get all PNG files in the given directory and return them as a list of dictionaries,
  each containing the filename and the base64 encoded data of the image.

  @param directory: The directory to scan for PNG files.
  @return: A list of dictionaries with keys 'name' and 'data' for each PNG image.
  """
  images = []
  # List all files in the given directory
  for filename in os.listdir(directory):
    if filename.endswith(".png"):
      # Full path to the file
      filepath = os.path.join(directory, filename)
      
      # Read the image file in binary mode
      with open(filepath, 'rb') as image_file:
        # Encode the binary data to base64
        base64_string = f"data:image/png;base64,{base64.b64encode(image_file.read()).decode('utf-8')}"
        
        # Append the result to the list
        images.append({"name": filename, "data": base64_string})

  return images

