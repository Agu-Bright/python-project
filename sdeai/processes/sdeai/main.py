import core
import processes
import lib
from .react_util import generate_codebase as react_code_gen
from .nodejs_util import generate_codebase as nodejs_code_gen

def run(vars):

  if 'understanding_context' in vars['stages']:
    # Find Data Flows and Database Models
    print('# Understanding Data Flows and Database Models\n')

    context = processes.context_creation.run(vars)
    # print('sdeai: understanding context', context)

    context_variables = context['variables']
    data_flows = context_variables['data_flows']
    database_models = context_variables['database_models']
    vars['data_flows'] = data_flows
    vars['database_models'] = database_models

    res = '## Data Flows\n\n'

    for flow_category, flow_list in data_flows.items():
      res += f'''### {flow_category}\n\n'''

      for flow in flow_list:
        res += f'''#### {flow['title']}\n'''

        for event in flow['events']:
          res += f'- {event}\n'
      
      res += '\n\n'
    print(res)

    # Find Database Models
    
    res = '## Database Models\n\n'
    for model in database_models:
      res += f'''### {model['title']}\n'''
      res += '| Field | Type |\n| --- | --- |\n'

      for field in model['fields']:
        res += f'| {field["identifier"]} | {field["type"]} |\n'
      
      res += '\n'
    print(res)

  if 'planning_core' in vars['stages']:
    # Find Layouts and Routes
    print('# Planning UI\n')

    planning_ui = processes.planning_ui.run(vars)
    # print('sdeai: planning_ui', planning_ui)

    context_variables = planning_ui['variables']
    layouts_with_routes = context_variables['layouts_with_routes']
    vars['layouts_with_routes'] = layouts_with_routes

    res = '## Layouts and Routes\n\n'
    for layout in layouts_with_routes:
      res += f'''### {layout['title']}\n'''
      res += f'{layout["description"]}\n\n'
      res += '| Path | Description |\n| --- | --- |\n'

      for route in layout['routes']:
        res += f'| {route["path"]} | {route["description"]} |\n'
      
      res += '\n'
    print(res)

    # Find API Endpoints
    print('# Planning API\n')
    planning_api = processes.planning_api.run(vars)
    # print('sdeai: planning_api', planning_api)

    context_variables = planning_api['variables']
    api_with_categories = context_variables['api_with_categories']
    vars['api_with_categories'] = api_with_categories

    # print('sdeai: api_with_categories', api_with_categories)

    res = '## API Endpoints\n\n'
    for api_category in api_with_categories:
      # print('sdeai: api', api)
      res += f'''### {api_category['title']}\n'''
      res += f'{api_category["description"]}\n\n'
      res += '| Path | Description |\n| --- | --- |\n'

      for endpoint in api_category['endpoints']:
        res += f'| {endpoint["path"]} | {endpoint["description"]} |\n'
      
      res += '\n'
    print(res)
    
  if 'designing_apis' in vars['stages']:
    print("# Designing APIs\n")

    designing_apis = processes.designing_apis.run(vars)
    # print('sdeai: designing_apis', designing_apis)

    context_variables = designing_apis['variables']
    api_with_categories_detailed = context_variables['api_with_categories_detailed']
    vars['api_with_categories_detailed'] = api_with_categories_detailed

    # print('sdeai: api_with_categories_detailed', api_with_categories_detailed)

    res = '## API Endpoints(Detailed)\n\n'
    for api_category in api_with_categories_detailed:
      res += f'''### {api_category['title']}\n'''
      res += f'{api_category["description"]}\n\n'
      
      for endpoint in api_category['endpoints']:

        res += f'''{endpoint['description']}\n\n'''
        res += f'''**Path:** {endpoint['path']}\n\n'''
        res += f'''**Method:** {endpoint['method']}\n\n'''

        if 'headers' in endpoint:
          res += f'''**Headers:**\n'''
          res += '| Name | Description |\n| --- | --- |\n'
          for header in endpoint['headers']:
            res += f'| {header["name"]} | {header["description"]} |\n'
          res += '\n'

        if 'path_slugs' in endpoint:
          res += f'''**Path Slugs:**\n'''
          res += '| Name | Description |\n| --- | --- |\n'
          for slug in endpoint['path_slugs']:
            res += f'| {slug["name"]} | {slug["description"]} |\n'
          res += '\n'
        
        if 'request_body' in endpoint:
          res += f'''**Request Body:**\n'''
          res += '| Name | Description |\n| --- | --- |\n'
          for field in endpoint['request_body']:
            res += f'| {field["name"]} | {field["description"]} |\n'
          res += '\n'
        
        if 'response_body' in endpoint:
          res += f'''**Response Body:**\n'''
          res += '| Name | Description |\n| --- | --- |\n'
          for field in endpoint['response_body']:
            res += f'| {field["name"]} | {field["description"]} |\n'
          res += '\n'
      
      res += '\n'
    print(res)

  if 'ui_builder' in vars['stages']:
    print('# Building UI\n')

    screen_codes = processes.ui_builder.run(vars)['variables']['screen_codes']
    vars['screen_codes'] = screen_codes

    react_code_gen(screen_codes)

  if 'server_builder' in vars['stages']:
    print('# Building Server\n')

    api_code = processes.server_builder.run(vars)['variables']['api_code']
    vars['api_code'] = api_code

    # print('> ', api_code)
    nodejs_code_gen(api_code)

  # Update Vars
  lib.util.save_vars(vars)



