import dotenv
from .openai import gpt
import os
import json

dotenv.load_dotenv()
# "url": f"data:image/png;base64,{img_b64}",

openai_config = {
  'api_key': os.getenv('OPENAI_API_KEY'),
  'organization': os.getenv('OPENAI_ORGANIZATION'),
  'project': os.getenv('OPENAI_PROJECT'),
  'model': 'gpt-4o'
  # 'model': 'gpt-4-turbo'
}

def generateText(chat, config = openai_config):
  chat.append({
    'role': 'system',
    'content': '''
      Generate a JSON as response in the following format:
      {
        "message": "<Message as described>",
        "variables": {
          // variables as described
        }
      }

      Remember to replace the comments with the actual data.
      Remember to generate the JSON in the correct format and no other data.
    '''
  })

  # cleanup dictonary format
  res = gpt.generateText(chat, config)
  res = json.loads(res)

  # print('generateText:', {
  #   'chat': chat,
  #   'res_type': type(res),
  #   'res': res
  # })

  return res
