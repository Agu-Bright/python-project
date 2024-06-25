import core

def run(vars):

  api_list = vars['api_with_categories_detailed']

  # group APIs by paths
  api_grouped_by_path = {}
  for api_category in api_list:
    for api_endpoint in api_category['endpoints']:
      path = api_endpoint['path']
      if path not in api_grouped_by_path:
        api_grouped_by_path[path] = []
        # api_grouped_by_path.append({
        #   'path': path,
        #   'endpoints': []
        # })
      api_grouped_by_path[path].append(api_endpoint)

  # generate code for each path
  res = []
  for api_path in api_grouped_by_path:
    chat = [
      {
        'role': 'user',
        'content': '''You are a software engineer. Generate Node.js/Express.js (using postgresql db) API endpoint handler.
        
        Here is a sample implementation of an API endpoint handler in Node.js/Express.js:

        const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Get all users
router.get('/', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM users');
    res.json(results.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const results = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (results.rows.length > 0) {
      res.json(results.rows[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

      Generate the code in the following JSON format:
      {
        'message': '',
        'variables': {
          'code': "<Generated code>"
        }
      }

      Now, generate entire code for the following API endpoints, remember all of these are mapped to the same API path.
      These are my APIs:
        ''' +

        f'''
        {api_grouped_by_path[api_path]}

        Additional notes:{vars['notes']}
        '''
      }
    ]
    code = core.genai.generateText(chat)['variables']['code']
    res.append({
      'path': api_path,
      'content': code
    })
  
  return {
    'message': 'Generated code for all APIs',
    'variables': {
      'api_code': res
    }
  
  }

def get_all_unique_endpoints(api_list):

  all_endpoints = []

  for api_category in api_list:

    for api_endpoint in api_category['endpoints']:
      path = api_endpoint['path']
      if path not in all_endpoints:
        all_endpoints.append(all_endpoints)

  return all_endpoints
    