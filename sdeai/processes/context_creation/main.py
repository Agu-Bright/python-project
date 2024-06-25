import core
import json

# We take a high level description of the app
# and understand the context in terms of data flows.


def run(vars):

  description = vars['description']
  database_type = vars['database_type']

  # Identify data flows
  chat = [
    {
      'role': 'system',
      'content': '''You are a software engineer. Identify high-level data flows that are happening from the application.

      Some data flows examples with flow title, followed by flow events are:

      # Authentication Flow

      ## User Sign In
      - User enters username and password.
      - API checks if username and password are correct.
      - If correct, user is logged in.
      
      ## User Sign Up
      - User enters username, email and password.
      - API checks if username is unique.
      - If username is unique, user is created in the database and a email-verification email is sent.
      - User clicks on the email verification link.
      - User is verified and can now login.

      # Product Flow

      ## Browsing on Store
      - User views store.
      - User searches for items and applies filters (if any).
      - User clicks on an item to view it.

      Now, using the description provided by the user, identify all data flows along grouped by flow categories that you can find.
      Use additional notes for details if provided.

      Generate the following the data format and respective description:
       {
        "message": Empty String(""),
        "variables: {
          "data_flows": {
            "<flow_category>": [
              {
                "title": "Title of the flow",
                "events": [
                  "List of events(strings) in the flow"
                ]
              },
              // other flows in the category
            ]
          }
        }
       }
      '''
    },
    {
      'role': 'user',
      'content': f'''Description:\n{description}\n\nAdditional Notes:\n{vars['notes']}'''
    }
  ]
  data_flows = core.genai.generateText(chat)['variables']['data_flows']

  # Identify database models
  database_models = {
    'message': '',
    'variables': {
      'models': []
    }
  }
  chat = []
  if database_type == 'postgresql':
    chat = [
      {
        'role': 'system',
        'content': '''You are a software engineer. Identify the database models and generate schemas for the respective models involved in the data flows.

        Some examples of database models are:

        1. user
        - id: int
        - username: string
        - email: string
        - password: string
        - created_at: datetime
        - updated_at: datetime

        2. product
        - id: int
        - name: string
        - description: string
        - price: float
        - created_at: datetime
        - updated_at: datetime


        Identify the database models that are involved in the data flows that you identified.
        Use additional notes for details if provided.

        Generate the following the data format and respective description:
        {
          "message": Empty String(""),
          "variables": {
            "models": [
              {
                "title": "Title of the database model",
                "fields": [
                  {
                    "identifier": "Identifier of the field",
                    "type": "Data Type of the field"
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
        'content': f'''Flows: Here are the data flows:
        
        {data_flows}

        Additional Notes:\n{vars['notes']}
        '''
      }
    ]
  
  if len(chat) > 0:
    database_models = core.genai.generateText(chat)['variables']['models']

  # print("DEBUG", type(data_flows))
  # print("DEBUG", type(data_flows['variables']))
  # print("DEBUG", type(data_flows['variables']['data_flows']))
  
  return {
    "message": "",
    "variables": {
      "data_flows": data_flows,
      "database_models": database_models
    }
  }
  
  