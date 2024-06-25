import core
import json

# Identifying layouts and routes

def run(vars):

  description = vars['description']
  data_flows = vars['data_flows']

  # Identify API categories
  api_with_categories = []
  api_category_titles = []
  for flow_category, flow in data_flows.items():
    chat = [
      {
        'role': 'system',
        'content': '''You are a software engineer. Identify the high-level API categories that would be needed.

        Some api examples are:

        1. Authentication API
        2. Product API
        3. Profile API
        4. Merchant API

        Now, using the data flows provided by the user, identify API categories directly related to the flow events provided by the user.
        Use additional notes for details if provided.

        Generate the following the data format and respective description:
        {
          "message": Empty String(""),
          "variables: {
            "api_categories": [
              {
                "title": "Title of the API category",
                "description": "Brief description of the API category"
              }
            ]
          }
        }
        '''
      },
      {
        'role': 'user',
        'content': f'''
        Data Flows: \n{flow_category}: {data_flows[flow_category]}\n
        Additional Notes: {vars['notes']}\n
        '''
      }
    ]

    # clean up api categories
    api_categories_cur = core.genai.generateText(chat)['variables']['api_categories']
    filtered_api_categories = []
    for new_category in api_categories_cur:
      if new_category['title'] not in api_category_titles:
        api_category_titles.append(new_category['title'])
        filtered_api_categories.append(new_category)
      else:
        continue
    api_categories_cur = filtered_api_categories

    # print('planning_api: API category for flow_category', flow_category, api_categories_cur)
    api_with_categories.extend(api_categories_cur)

  # Identify API per category
  for api_category in api_with_categories:
    chat = [
      {
        'role': 'system',
        'content': '''You are a software engineer. Identify the granual-level endpoints needed.

        Some examples of page routes per layout are:

        1. Authentication API
        This API is for handling authentication and manage access to account.
        - /signin : Sign In 
        - /signup : Sign Up
        - /forgot-password : Forgot Password
        - /verify-email : Verify Email
        - /logout : Logout
        - /reset-password : Reset Password
        - /change-password : Change Password
        - /delete-account : Delete Account

        2. Product
        This API is for managing and browsing products.
        - /product : Search Products, Create Product
        - /product/:product_id : Get Product, Update Product, Delete Product
        - /product/seller/:seller_id : Get Products by Seller

        Identify API using API endpoints needed for handling the specific API Category provided by the user only.
        All API endpoint paths have a default prefix /api/v1 unless specified by the user.
        All APIs under the same category should have the same prefix.
        Use additional notes for details if provided.

        Generate the following the data format and respective description:
        {
          "message": Empty String(""),
          "variables": {
            "endpoints": [
              {
                "path": "Absolute path of the route",
                "description": "Brief description of this page."
              }
            ]
          }
        }
        '''
      },
      {
        'role': 'user',
        'content': f'''
        Data Flows: \n{data_flows}\n 
        API Category: \n{api_category}\n
        Additional Notes: {vars['notes']}\n
        '''
      }
    ]
  
    endpoints = core.genai.generateText(chat)['variables']['endpoints']
    api_category['endpoints'] = endpoints

  # print("DEBUG: api_with_categories", api_with_categories)
  
  return {
    "message": "",
    "variables": {
      "api_with_categories": api_with_categories
    }
  }
  
  