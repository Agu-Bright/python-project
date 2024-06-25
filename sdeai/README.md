# README

## Description

I want a simple TODO app. The users should be able to login into the application using username and passwords.
On signup, firstname, middlename, lastname, email, username, password is needed. Email should be verified.

On login, the user should be able to see a search TODOs using the title. Otherwise, simply show all TODOs paginated. The TODO item looks like a simple text beside a checkbox. That is it.

--------------------------------

## Identifying DB Models
## Identifying High-Level Data Flows
## Identifying Layouts
## Identifying routes for each layout
## Identifying APIs

## Identifying Data Flows for each Page
## Identifying Data Flows for each API
## Generating API Documentation for each API
## Generate APIClient
## Generate Model Code for each Model
## Generating Controllers for each model
## Generating API Code for each API
## Identifying Design Systems
## Identifying Components for each Design System
## Identifying Data Flows for each Component
## Generating Component API Code for each Component
## Generating Component Code for each Component
## Generating Page Code for each Page
## Codebase

- **boilerplate_filepath**: string
- `package.json`
  - **app_name**: string
  - **version**: string
- `src/middleware.ts`
  - **corsWhitelist**: string[]
- `src/client/lib`
  - **app_name**: string
  - `<app_name>client`
    - `const.ts`
      - **app_url**: string
      - **api_list**: string[]
    - `index.ts`
      - **app_name**: string
      - **api_list**: string[]
    - `util.py`:
      - **app_name**: string
- `src/server`
  - `apipostloaders`
      - **apipostloaders_list**: list of apipostloaders
    - `apipreloaders`
      - **apipreloaders_list**: list of apipreloaders
    - `cryptics`
      - **cryptics_list**: list of cryptics
    - `databases`
      - **databases_list**: list of databases
    - `emaiil`
      - **email_list**: list of email operations
    - `models`
      - **models_list**: list of models, apis, dataflows
  - `lib/types/dbconfig.ts`
    -- **db_type_list** list of databases used
- `src/app/api`
  - **api_list**: list of apis and respective data flows

    