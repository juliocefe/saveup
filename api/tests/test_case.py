from flask import Flask
from flask_testing import TestCase
from flask import current_app, url_for, session, g

# from run import app

class  MainTest(TestCase):
    def create_app(self):
        current_app.config['TESTING'] = True
        current_app.config['WTF_CSRF_ENABLED'] = False
        SECRET_KEY = 'la vaca de juan no da leche.'
        return current_app
    
    def test_app_exists(self):
        self.assertIsNotNone(current_app)

    def test_app_in_test_mode(self):
        self.assertTrue(current_app.config['TESTING'])

    def test_auth_blueprint_exists(self):
        self.assertIn('auth', self.app.blueprints)

    def test_auth_login_get(self):
        response = self.client.get(url_for('auth.login'))
        self.assert200(response)

    # # #login unit tests
    def test_index_redirects(self):
        response = self.client.get(url_for('auth.logout'))
        self.assertRedirects(response, url_for('auth.login'))
    
    def test_login_get(self):
        response = self.client.get(url_for('index'))

        self.assert200(response)

    def test_login_post(self):
        fake_form = {
            'username': 'test',
            'password': '123'
        }
        response = self.client.post(url_for('auth.login'), data=fake_form)
        self.assert200(response)
                                                      #login unit tests
    
#     #test return the user list with a 200 http code 
    def test_users_get(self):
        response = self.client.get(url_for('users.render_users'))
        self.assert200(response)
      
    def test_newUser_get(self):
        response = self.client.get(url_for('users.new_user'))
        self.assert200(response)
        
# #     #New user units tests
    def test_user_exists_post(self):
        fake_form = {
            'username': 'test',
            'password1': '123',
            'password2': '123',
            'name': 'test',
            'lastname': 'test',
            'phone': 'test',
            'email': 'test@gmail.com'
        }
        response = self.client.post(url_for('users.new_user'), data=fake_form)
        self.assertStatus(response, 303)
    
    def test_user_passwords_not_match(self):
        fake_form = {
            'username': 'test',
            'password1': '123',
            'password2': '12345',
            'name': 'test',
            'lastname': 'test',
            'phone': 'test',
            'email': 'test@gmail.com'
        }
        response = self.client.post(url_for('users.new_user'), data=fake_form)
        self.assertStatus(response, 401)

    def test_lists_blueprint_exists(self):
        self.assertIn('lists', self.app.blueprints)

    def test_lists_blueprint_exists(self):
        response = self.client.post(url_for('lists.generate_list'), data=[])
        self.assert200(response)
    
# #     #Update user units tests
#     def test_update_user(self):
#         fake_form = {
#             'username': 'test',
#             'password1': 'fakePassword1',
#             'password2': 'fakePassword1',
#             'id': 5
#         }
#         response = self.client.post(url_for('users.update_user'), data=fake_form)
#         self.assertRedirects(response, 'users/users')
    
# #     #Is looking for delete a user that not exists
#     def test_delete_user_id_not_found(self):
#         response = self.client.delete(url_for('users.delete_user', id=-3))
#         self.assert404(response)
   
    
    


    
