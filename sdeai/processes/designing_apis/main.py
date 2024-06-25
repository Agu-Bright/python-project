import core

def run(vars):
  
  api_with_categories = vars['api_with_categories']
  notes = vars['notes']

  # generate API Endpoint details
  api_endpoints = []
  for category in api_with_categories:
    category_endpoints = {}
    category_endpoints['title'] = category['title']
    category_endpoints['description'] = category['description']
    category_endpoints['endpoints'] = []

    for endpoint in category['endpoints']:
      chat = [
        {
          'role': 'system',
          'content': '''You are a software engineer. 
          
          Using the description and API path provided by the user, generate API Endpoint in terms of:
          - path slugs(optional/if present)
          - headers(optional/if present)
          - method
          - request body(optional/if present)
          - response body(optional/if present)

          If there are multiple endpoints identified(multiple methods), generate separate endpoints.
          
          Generate the following data format and respective description:
          {
            "message": Empty String(""),
            "variables": {
              "api_endpoints": [
                  {
                  "path": "Path of the API Endpoint",
                  "description": "Function of this API Endpoint",
                  "headers": [
                    {
                      "name": "Name of the Header",
                      "description": "Description of the Header"
                    }
                  ],
                  "path_slugs": [
                    {
                      "name": "Name of the Slug",
                      "description": "Description of the Slug"
                    }
                  ],
                  "method": "Method of the API Endpoint",
                  "request_body": [
                    {
                      "name": "Name of the Request Body Field",
                      "description": "Description of the Request Body Field"
                    }
                  ],
                  "response_body": [
                    {
                      "name": "Name of the Response Body Field",
                      "description": "Description of the Response Body Field"
                    }
                  ]
                },
              ]
            }
          }
          '''
        },
        {
          'role': 'user',
          'content': f'''Path:{endpoint['path']}\n\n Description: {endpoint['description']}\n\nAPI Path: {endpoint['path']}\n\n Additional Notes: {notes}'''
        }
      ]

      current_endpoints = core.genai.generateText(chat)['variables']['api_endpoints']
      for api in current_endpoints:
        category_endpoints['endpoints'].append(api)
    
    api_endpoints.append(category_endpoints)
  
  return {
    'message': '',
    'variables': {
      'api_with_categories_detailed': api_endpoints
    }
  }