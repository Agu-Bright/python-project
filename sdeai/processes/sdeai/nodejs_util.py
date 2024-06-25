import os

def generate_codebase(api_code):

  file_data = []

  # boilerplate code
  file_data.extend([
    {
      'path': 'db/database.js',
      'content': '''const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
      '''
    },
    {
      'path': '.env',
      'content': '''DATABASE_URL=postgresql://svr8:nootnoot@localhost:5432/systems
      '''
    },
    {
      'path': 'index.js',
      'content': '''require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./api/users/users.routes');

app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
      '''
    },
    {
      'path': 'package.json',
      'content': '''{
  "name": "expressjs-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "pg": "^8.11.5"
  }
}
      '''
    }
  ])


  # routes
  for api in api_code:
    api_path = api['path']
    if api_path.endswith('/'):
      api_path = api_path[:-1]
    if api_path.startswith('/'):
      api_path = api_path[1:]

    path = f'{api_path}.js'
    content = api['content']
    file_data.append({
      'path': f'{path}',
      'content': content
    })

  # save files
  save_files(file_data)



def save_files(file_info_list):
  for file_info in file_info_list:
    # Check if the dictionary has the required keys
    if 'path' in file_info and 'content' in file_info:
      # Create directory if it does not exist
      file_info['path'] = f'data/nodejs_app/{file_info["path"]}'

      directory = os.path.dirname(file_info['path'])
      if not os.path.exists(directory) and directory != '':
        os.makedirs(directory)

      # Write the content to the file
      with open(file_info['path'], 'w') as file:
        file.write(file_info['content'])
    else:
      print("Error: Dictionary missing required keys 'path' or 'content'.")