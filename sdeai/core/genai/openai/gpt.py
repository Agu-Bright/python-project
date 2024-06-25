import dotenv

from openai import OpenAI

dotenv.load_dotenv()
openaiClient = OpenAI()

'''
Generate text using OpenAI's GPT-4 model.

@param messages: list of messages to generate text from
@param config: dictionary gpt configuration data
@return: generated text
'''
def generateText(messages, config):
  # set configuration
  # client = openai.OpenAI(
  #   organization=config['organization'],
  #   project=config['project'],
  # )

  # generate text
  completion = openaiClient.chat.completions.create(
    model=config['model'],
    messages=messages,
    response_format={
      "type": "json_object"
    }
  )

  return completion.choices[0].message.content