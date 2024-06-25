import core

def run(vars):

  screens = vars['screen_images']

  res = []

  for screen in screens:
    code = generate_code_for_screen(screen)
    screen_name = screen['name']
    res.append({
      'name': screen_name[:screen_name.index('.png')],
      'code': code
    })
  
  return {
    'variables': {
      'screen_codes': res
    }
  }

def generate_code_for_screen(screen):
  
  # describe the layout of the screen
  message = '''You are a software engineer. 
        Use the existing components created for reference and describe the layout of the webpage visually. Objectify the arrangement so it becomes easy to generate code for the layout.
      Include all details that are possible.

      Describe the components in the following format:
      {
        "message": "",
        "variables": {
          "description": "<Layout description>"
        }
      }

      This is my UI image:
      '''
  chat = [
    {
      'role': 'user',
      'content': [
        {
          'type': 'text',
          'text': message
        },
        {
          'type': 'image_url',
          'image_url': {
            'url': screen['data'],
          }
        }
      ]
    },
  ]
  layout_description = core.genai.generateText(chat)['variables']['description']

  # print('# Layout')
  # print(layout_description)

  # describe user journies
  message = '''You are a software engineer. 
        Use the existing components created for reference and describe user journeys that might be happening. Objectify steps in the user journey so it becomes easy to generate code for the layout.
      Include all details that are possible.
      
      Describe the components in the following format:
      {
        "message": "",
        "variables": {
          "user_journeys": [
            { "title": "<Journey Title>", "description": "<Journey Description>" },
            // and so on
          ]
        }
      }

      This is my UI image:
      '''
  chat = [
    {
      'role': 'user',
      'content': [
        {
          'type': 'text',
          'text': message
        },
        {
          'type': 'image_url',
          'image_url': {
            'url': screen['data'],
          }
        }
      ]
    }
  ]
  user_journeys = core.genai.generateText(chat)['variables']['user_journeys']
  
  chat = [
    {
      'role': 'user',
      'content': [
        {
          'type': 'text',
          'text': '''
      You are a software engineer. Use Material UI and React to generate component code.
      Rules:
      - use 2 spaces for indentation
      - ready to use page component that looks exactly as it is in the image
      - functional component
      - component names should be in PascalCase, AlphaNumeric(numeric is optional)
      - use layout description and user journeysfor additional clarity
      - use the same colours as it is
      - use same font, text colours, background colours, decorations
      - use the same fonts as it is
      - spacing, padding and margin are as it is
      - use same icons
      - use same rounded corners or border radius
      - make it responsive as much as possible

      Generate code in the following JSON format:
      {
        "message": "<Empty String>",
        "variables": {
          "code": "<Component code>"
        }
      }
      ''' + 
      f'''

      User Journeys:
      {user_journeys}
      
      This is my UI image:
      '''
        },
        {
          'type': 'image_url',
          'image_url': {
            'url': screen['data'],
          }
        }
      ]
    }
  ]

  return core.genai.generateText(chat)['variables']['code']
  

  

 
  
  