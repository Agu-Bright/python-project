import core
import json

# Identifying layouts and routes

def run(vars):

  description = vars['description']
  data_flows = vars['data_flows']

  # Identify layouts
  chat = [
    {
      'role': 'system',
      'content': '''You are a software engineer. Identify high-level frontend layouts that would be needed for the application.

      Some layout examples are:

      1. Authentication Layout
      2. Dashboard Layout
      3. Marketing Site Layout

      Now, using the description and data flows provided by the user, identify all layouts that you can find.
      Use additional notes for details if provided.

      Generate the following the data format and respective description:
       {
        "message": Empty String(""),
        "variables: {
          "layouts": [
            {
              "title": "Title of the layout",
              "content": "Brief description of the layout"            }
          ]
        }
       }
      '''
    },
    {
      'role': 'user',
      'content': f'''
      Description: {description}\n\n 
      Data Flows: {data_flows}\n\n 
      Additional Notes: {vars['notes']}
      '''
    }
  ]
  layouts = core.genai.generateText(chat)['variables']['layouts']

  # Identify page routes per layout
  layouts_with_routes = {
    'message': '',
    'variables': {
      'layouts': []
    }
  }
  chat = [
    {
      'role': 'system',
      'content': '''You are a software engineer. Identify the page routes needed for each layout.

      Some examples of page routes per layout are:

      1. Authentication Layout
      - /login : Sign In Page
      - /signup : Sign Up Page
      - /forgot-password : Forgot Password Page

      2. Marketing Site
      - / : Landing Page
      - /features : Features Page
      - /pricing : Pricing Page

      Identify page routes per layout using data flows and layouts provided by the user.
      Use additional notes for details if provided.

      Generate the following the data format and respective description:
      {
        "message": Empty String(""),
        "variables": {
          "layouts": [
            {
              "title": "Title of the layout",
              "description": "Description of the layout",
              "routes": [
                {
                  "path": "Absolute path of the route",
                  "description": "Brief description of this page."
                }
              ]
            }
          ]
        }
      }
      '''
    },
    {
      'role': 'user',
      'content': f'''
      Layouts: \n{layouts}\n 
      Data Flows: \n{data_flows}\n
      Additional Notes: {vars['notes']}\n
      '''
    }
  ]
  
  layouts_with_routes = core.genai.generateText(chat)['variables']['layouts']

  return {
    "message": "",
    "variables": {
      "layouts_with_routes": layouts_with_routes
    }
  }
  
  