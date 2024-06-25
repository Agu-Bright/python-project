import core
import processes
import lib

vars = lib.util.load_vars()

vars['stages'] = {}
vars['screen_images'] = lib.util.get_png_images_as_base64('data/screens')

vars['description'] = '''
I want a simple TODO app. These are the features I want:
- Users should be able to signup and login. Account details: firstname, middlename, lastname, email, username, password.
- Multiple users with same email can exist. Username must be different.
- Email verification is a must. Users should not able to login to dashboard without verifying email. When the users click on the email link, users should visit a verification page on our app.
- Users should be able to create, read, update and delete tasks. A task simply a text(title of task).
- Users should be able to mark a task as completed or not completed.
- Users should be able view most recent tasks(paginated).
- Users should be able to search tasks using a search bar for title search and adjust pagination.
- Users should be able to logout.
- Users should be able to delete their account, update their name, email, and, password.
  '''

vars['database_type'] = 'postgresql'
vars['server_type'] = 'nodejs'

vars['notes'] = '''
- Dashboard: Browse and Manage Tasks
- There should be no separate page for viewing/managing a task. It should be possible on dashboard itself.
- Settings: Manage Account Settings including Delete Account.
- Layouts needed: Auth, Dashboard
- Settings should be part of Dashboard (UI route): /dashboard/settings
- Have a Profile API to update user details like name, email, password: /api/v1/profile
'''

# vars['stages']['understanding_context'] = {}
# vars['stages']['planning_core'] = {}
# vars['stages']['designing_apis'] = {}

# vars['stages']['ui_builder'] = {}
vars['stages']['server_builder'] = {}

processes.sdeai.run(vars)
