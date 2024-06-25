# Understanding Data Flows and Database Models

## Data Flows

### Authentication Flow

#### User Sign Up
- User enters firstname, middlename, lastname, email, username, and password.
- API checks if username is unique.
- If username is unique, user is created in the database and an email-verification email is sent.
- User clicks on the email verification link.
- User is verified and can now login.
#### User Sign In
- User enters username and password.
- API checks if username and password are correct.
- If correct and email is verified, user is logged in.
#### Email Verification
- User clicks on the email verification link.
- User visits a verification page on the app.
#### User Logout
- User clicks logout button.
- User is logged out.


### Profile Management Flow

#### Update User Details
- User navigates to /dashboard/settings.
- User updates firstname, middlename, lastname, email, and/or password.
- API updates user details through /api/v1/profile.
#### Delete Account
- User navigates to /dashboard/settings.
- User initiates account deletion.
- API deletes the user's account.


### Task Management Flow

#### Create Task
- User enters the task title.
- API creates the task in the database.
#### Read Tasks (View Most Recent Tasks)
- User navigates to dashboard.
- API retrieves most recent tasks (paginated).
#### Update Task
- User selects a task from the dashboard.
- User updates the task title.
- API updates the task in the database.
#### Delete Task
- User selects a task from the dashboard.
- User deletes the task.
- API deletes the task from the database.
#### Mark Task as Completed/Not Completed
- User selects a task from the dashboard.
- User toggles the task status between completed and not completed.
- API updates the task status in the database.
#### Search Tasks
- User enters task title in the search bar.
- User adjusts pagination if necessary.
- API retrieves matching tasks.



## Database Models

### user
| Field | Type |
| --- | --- |
| id | int |
| firstname | string |
| middlename | string |
| lastname | string |
| username | string |
| email | string |
| password | string |
| email_verified | bool |
| created_at | datetime |
| updated_at | datetime |

### task
| Field | Type |
| --- | --- |
| id | int |
| title | string |
| user_id | int |
| is_completed | bool |
| created_at | datetime |
| updated_at | datetime |


# Planning UI

## Layouts and Routes

### Authentication Layout
This layout is used for user signup, login, and email verification. It will include forms for entering account details and verifying email addresses.

| Path | Description |
| --- | --- |
| /signup | Sign Up Page for new users to enter their details and create an account. |
| /login | Sign In Page for existing users to login using their username and password. |
| /verify-email | Email Verification Page where users are redirected after clicking the verification link in their email. |

### Dashboard Layout
This layout is used for managing tasks and user settings. Users can create, read, update, delete, and search tasks, as well as manage their account details and logout. The settings for updating details and deleting the account will be part of this layout under /dashboard/settings.

| Path | Description |
| --- | --- |
| /dashboard | Dashboard Page where users can browse and manage their tasks. |
| /dashboard/settings | Settings Page where users can update their profile details or delete their account. |


# Planning API

## API Endpoints

### Authentication API
Handles user sign-up, sign-in, email verification, and logout processes.

| Path | Description |
| --- | --- |
| /api/v1/signin | Sign In |
| /api/v1/signup | Sign Up |
| /api/v1/forgot-password | Forgot Password |
| /api/v1/verify-email | Verify Email |
| /api/v1/logout | Logout |
| /api/v1/reset-password | Reset Password |
| /api/v1/change-password | Change Password |
| /api/v1/delete-account | Delete Account |

### Profile API
Allows users to update their personal details such as name, email, and password.

| Path | Description |
| --- | --- |
| /api/v1/profile | API endpoint to update user personal details such as name, email, and password. |
| /api/v1/profile/change-password | API endpoint to change the current user's password. |
| /api/v1/profile/delete-account | API endpoint to delete the user's account. |

### Dashboard API
Supports browsing and managing tasks directly from the dashboard interface.

| Path | Description |
| --- | --- |
| /api/v1/tasks | Search Tasks, Create Task |
| /api/v1/tasks/:task_id | Get Task, Update Task, Delete Task, Toggle Task Completion Status |

### Task Management API
APIs for creating, reading, updating, deleting, and searching tasks as well as toggling task status.

| Path | Description |
| --- | --- |
| /api/v1/tasks | Create a new task, retrieve most recent tasks (paginated), or search tasks. |
| /api/v1/tasks/:task_id | Retrieve, update, or delete a specific task. |
| /api/v1/tasks/:task_id/status | Toggle the completion status of a specific task. |


# Designing APIs

## API Endpoints(Detailed)

### Authentication API
Handles user sign-up, sign-in, email verification, and logout processes.

Sign In

**Path:** /api/v1/signin

**Method:** POST

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |

**Request Body:**
| Name | Description |
| --- | --- |
| email | The email address of the user. |
| password | The password of the user. |

**Response Body:**
| Name | Description |
| --- | --- |
| token | Authentication token for the session. |
| user | Details of the signed-in user. |

Sign Up

**Path:** /api/v1/signup

**Method:** POST

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |

**Request Body:**
| Name | Description |
| --- | --- |
| username | The username for the new account |
| email | The email address for the new account |
| password | The password for the new account |

**Response Body:**
| Name | Description |
| --- | --- |
| user_id | The unique identifier for the created user |
| token | The authentication token for the created user |

Profile API to update user details like name, email, password

**Path:** /api/v1/profile

**Method:** PUT

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |

**Request Body:**
| Name | Description |
| --- | --- |
| name | The new name for the user |
| email | The new email address for the user |
| password | The new password for the user |

**Response Body:**
| Name | Description |
| --- | --- |
| message | Status of the update operation |

Forgot Password

**Path:** /api/v1/forgot-password

**Method:** POST

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |

**Request Body:**
| Name | Description |
| --- | --- |
| email | The email address of the user who forgot the password |

**Response Body:**
| Name | Description |
| --- | --- |
| message | A success message indicating that the password recovery email was sent |

Verify Email

**Path:** /api/v1/verify-email

**Method:** POST

**Request Body:**
| Name | Description |
| --- | --- |
| email | The email address to be verified |
| verificationCode | The verification code sent to the email address |

**Response Body:**
| Name | Description |
| --- | --- |
| status | The status of the email verification |
| message | A message providing additional information about the verification status |

Logout

**Path:** /api/v1/logout

**Method:** POST

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |

**Request Body:**
| Name | Description |
| --- | --- |

**Response Body:**
| Name | Description |
| --- | --- |

Reset Password

**Path:** /api/v1/reset-password

**Method:** POST

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |

**Request Body:**
| Name | Description |
| --- | --- |
| email | The email of the user requesting the password reset |
| newPassword | The new password for the user |
| token | The reset token sent to the user's email |

**Response Body:**
| Name | Description |
| --- | --- |
| status | The status of the reset password request (e.g., success, error) |
| message | A message detailing the result of the reset password request |

Update user details like name, email, password

**Path:** /api/v1/profile

**Method:** PUT

**Headers:**
| Name | Description |
| --- | --- |
| Authorization | Bearer token to authorize the request |

**Path Slugs:**
| Name | Description |
| --- | --- |

**Request Body:**
| Name | Description |
| --- | --- |
| name | The new name of the user |
| email | The new email of the user |
| password | The new password of the user |

**Response Body:**
| Name | Description |
| --- | --- |
| status | The status of the profile update request (e.g., success, error) |
| message | A message detailing the result of the profile update request |
| user | The updated user information |

Change Password

**Path:** /api/v1/change-password

**Method:** POST

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |

**Request Body:**
| Name | Description |
| --- | --- |
| current_password | The current password of the user. |
| new_password | The new password to set. |
| confirm_password | Confirmation of the new password. |

**Response Body:**
| Name | Description |
| --- | --- |
| success | Indicates if the password change was successful. |
| message | Additional information about the password change operation. |

Update user details like name, email, password

**Path:** /api/v1/profile

**Method:** PUT

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |

**Request Body:**
| Name | Description |
| --- | --- |
| name | The name of the user. |
| email | The email of the user. |
| password | The new password of the user. |

**Response Body:**
| Name | Description |
| --- | --- |
| success | Indicates if the profile update was successful. |
| message | Additional information about the profile update operation. |

Delete Account

**Path:** /api/v1/delete-account

**Method:** DELETE

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |

**Request Body:**
| Name | Description |
| --- | --- |

**Response Body:**
| Name | Description |
| --- | --- |
| message | A confirmation message indicating the deletion status. |


### Profile API
Allows users to update their personal details such as name, email, and password.

API endpoint to update user personal details such as name, email, and password.

**Path:** /api/v1/profile

**Method:** PUT

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |

**Request Body:**
| Name | Description |
| --- | --- |
| name | The name of the user to be updated. |
| email | The email of the user to be updated. |
| password | The password of the user to be updated. |

**Response Body:**
| Name | Description |
| --- | --- |
| status | Status of the update operation. |
| message | A message providing additional information about the update. |

API endpoint to change the current user's password.

**Path:** /api/v1/profile/change-password

**Method:** POST

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |

**Request Body:**
| Name | Description |
| --- | --- |
| current_password | The current password of the user. |
| new_password | The new password the user wants to set. |

**Response Body:**
| Name | Description |
| --- | --- |
| success | Indicates whether the password change was successful. |
| message | A message providing additional information about the password change outcome. |

API endpoint to delete the user's account

**Path:** /api/v1/profile/delete-account

**Method:** DELETE

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |

**Request Body:**
| Name | Description |
| --- | --- |

**Response Body:**
| Name | Description |
| --- | --- |


### Dashboard API
Supports browsing and managing tasks directly from the dashboard interface.

Search Tasks

**Path:** /api/v1/tasks

**Method:** GET

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |

**Request Body:**
| Name | Description |
| --- | --- |

**Response Body:**
| Name | Description |
| --- | --- |
| tasks | A list of tasks matching the search criteria |
| total_count | Total number of tasks matching the search criteria |

Create Task

**Path:** /api/v1/tasks

**Method:** POST

**Headers:**
| Name | Description |
| --- | --- |
| Content-Type | Indicates the media type of the resource, typically 'application/json' |

**Path Slugs:**
| Name | Description |
| --- | --- |

**Request Body:**
| Name | Description |
| --- | --- |
| title | The title of the task |
| description | A detailed description of the task |
| due_date | The due date for the task |

**Response Body:**
| Name | Description |
| --- | --- |
| task_id | The unique identifier of the created task |
| title | The title of the created task |
| description | A detailed description of the created task |
| due_date | The due date for the created task |

Get details of a specific task using its ID

**Path:** /api/v1/tasks/:task_id

**Method:** GET

**Path Slugs:**
| Name | Description |
| --- | --- |
| task_id | Unique identifier of the task |

**Response Body:**
| Name | Description |
| --- | --- |
| task_id | Unique identifier of the task |
| title | The title of the task |
| description | Detailed description of the task |
| status | Current status of the task (e.g., completed, pending) |
| due_date | The due date of the task |

Update details of a specific task using its ID

**Path:** /api/v1/tasks/:task_id

**Method:** PUT

**Path Slugs:**
| Name | Description |
| --- | --- |
| task_id | Unique identifier of the task |

**Request Body:**
| Name | Description |
| --- | --- |
| title | The title of the task |
| description | Detailed description of the task |
| status | Current status of the task (e.g., completed, pending) |
| due_date | The due date of the task |

**Response Body:**
| Name | Description |
| --- | --- |
| message | Status message indicating the result of the update operation |

Delete a specific task using its ID

**Path:** /api/v1/tasks/:task_id

**Method:** DELETE

**Path Slugs:**
| Name | Description |
| --- | --- |
| task_id | Unique identifier of the task |

**Response Body:**
| Name | Description |
| --- | --- |
| message | Status message indicating the result of the delete operation |

Toggle the completion status of a specific task using its ID

**Path:** /api/v1/tasks/:task_id/toggle

**Method:** POST

**Path Slugs:**
| Name | Description |
| --- | --- |
| task_id | Unique identifier of the task |

**Response Body:**
| Name | Description |
| --- | --- |
| message | Status message indicating the result of the toggle operation |

Update user profile details like name, email, and password

**Path:** /api/v1/profile

**Method:** PUT

**Request Body:**
| Name | Description |
| --- | --- |
| name | Updated name of the user |
| email | Updated email address of the user |
| password | Updated password of the user |

**Response Body:**
| Name | Description |
| --- | --- |
| message | Status message indicating the result of the update operation |


### Task Management API
APIs for creating, reading, updating, deleting, and searching tasks as well as toggling task status.

Create a new task

**Path:** /api/v1/tasks

**Method:** POST

**Request Body:**
| Name | Description |
| --- | --- |
| title | Title of the task |
| description | Description of the task |
| due_date | Due date of the task |

**Response Body:**
| Name | Description |
| --- | --- |
| id | Unique identifier of the created task |
| title | Title of the created task |
| description | Description of the created task |
| due_date | Due date of the created task |
| created_at | Timestamp of when the task was created |

Retrieve most recent tasks (paginated)

**Path:** /api/v1/tasks

**Method:** GET

**Request Body:**
| Name | Description |
| --- | --- |

**Response Body:**
| Name | Description |
| --- | --- |
| tasks | List of tasks |
| page | Current page number |
| total_pages | Total number of pages |

Search tasks

**Path:** /api/v1/tasks

**Method:** GET

**Request Body:**
| Name | Description |
| --- | --- |

**Response Body:**
| Name | Description |
| --- | --- |
| tasks | List of tasks matching the search criteria |
| page | Current page number |
| total_pages | Total number of pages |

Retrieve, update, or delete a specific task

**Path:** /api/v1/tasks/:task_id

**Method:** GET

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |
| task_id | Identifier for the specific task |

**Request Body:**
| Name | Description |
| --- | --- |

**Response Body:**
| Name | Description |
| --- | --- |
| task | Details of the specified task |

Retrieve, update, or delete a specific task

**Path:** /api/v1/tasks/:task_id

**Method:** PUT

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |
| task_id | Identifier for the specific task |

**Request Body:**
| Name | Description |
| --- | --- |
| name | New name of the task |
| description | New description of the task |
| status | New status of the task |

**Response Body:**
| Name | Description |
| --- | --- |
| task | Updated details of the specified task |

Retrieve, update, or delete a specific task

**Path:** /api/v1/tasks/:task_id

**Method:** DELETE

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |
| task_id | Identifier for the specific task |

**Request Body:**
| Name | Description |
| --- | --- |

**Response Body:**
| Name | Description |
| --- | --- |
| message | Confirmation of task deletion |

Toggle the completion status of a specific task.

**Path:** /api/v1/tasks/:task_id/status

**Method:** PUT

**Headers:**
| Name | Description |
| --- | --- |

**Path Slugs:**
| Name | Description |
| --- | --- |
| task_id | The unique identifier of the task. |

**Request Body:**
| Name | Description |
| --- | --- |

**Response Body:**
| Name | Description |
| --- | --- |
| task_id | The unique identifier of the task. |
| status | The new completion status of the task. |



