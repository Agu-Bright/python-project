import shutil
import os

def create_file(file_path, content):
  # Extract the directory name from the path
  directory = os.path.dirname(file_path)
  
  # Check if the directory exists, and if not, create it
  if not os.path.exists(directory):
    os.makedirs(directory)  # os.makedirs creates all the intermediate directories if they don't exist

  # Open the file and write the content
  with open(file_path, 'w') as file:
    file.write(content)
  
def delete_directory(path):
  """
  Deletes the directory at the specified path along with all its contents.

  Args:
  path (str): The path of the directory to delete.
  """
  # Check if the directory exists
  if os.path.exists(path) and os.path.isdir(path):
    # Remove the directory and all its contents
    shutil.rmtree(path)
  else:
    pass  # Directory does not exist