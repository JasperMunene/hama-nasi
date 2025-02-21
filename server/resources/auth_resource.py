from flask import url_for, current_app
from flask_restful import Resource, reqparse
from models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from extensions import bcrypt
from blacklist import BLACKLIST
from oauth_setup import google  # Import from the new module

# Signup Resource
class SignupResource(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, help="Name cannot be blank!")
        parser.add_argument('email', type=str, required=True, help="Email cannot be blank!")
        parser.add_argument('password', type=str, required=True, help="Password cannot be blank!")
        args = parser.parse_args()

        if User.query.filter_by(email=args['email']).first():
            return {"message": "User with that email already exists"}, 400

        hashed_password = bcrypt.generate_password_hash(args['password']).decode('utf-8')
        new_user = User(
            name=args['name'],
            email=args['email'],
            password=hashed_password,
        )
        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=str(new_user.id))
        return {
            "message": "User created successfully",
            "access_token": access_token
        }, 201

# Login Resource
class LoginResource(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, help="Email is required!")
        parser.add_argument('password', type=str, required=True, help="Password is required!")
        args = parser.parse_args()

        user = User.query.filter_by(email=args['email']).first()
        if not user or not bcrypt.check_password_hash(user.password, args['password']):
            return {"message": "Invalid email or password"}, 401

        access_token = create_access_token(identity=str(user.id))
        return {
            "message": "Login successful",
            "access_token": access_token
        }, 200

# Logout Resource
class LogoutResource(Resource):
    @jwt_required()
    def post(self):
        jti = get_jwt()["jti"]
        BLACKLIST.add(jti)
        return {"message": "Successfully logged out"}, 200

# Login with Google Resource
class LoginGoogle(Resource):
    def get(self):
        try:
            # Use the endpoint name defined in app.py for the callback
            redirect_url = url_for('authorize_google', _external=True)
            return google.authorize_redirect(redirect_url)
        except Exception as e:
            current_app.logger.error(f"Error during Google login: {str(e)}")
            return {"message": "Error occurred during login"}, 500

# Authorize Google Resource
class AuthorizeGoogle(Resource):
    def get(self):
        try:
            token = google.authorize_access_token()
        except Exception as e:
            current_app.logger.error(f"Error authorizing Google access token: {str(e)}")
            return {"message": "Failed to authorize access token", "error": str(e)}, 400

        userinfo_endpoint = google.server_metadata.get('userinfo_endpoint')
        if not userinfo_endpoint:
            return {"message": "Userinfo endpoint not available"}, 500

        res = google.get(userinfo_endpoint)
        user_info = res.json()
        email = user_info.get('email')
        if not email:
            return {"message": "Email not found in user info"}, 400

        # Check if user exists by email
        user = User.query.filter_by(email=email).first()
        if not user:
            user = User(
                name=user_info.get('name', email),
                email=email,
                password=''  # OAuth users may not require a password
            )
            db.session.add(user)
            db.session.commit()

        access_token = create_access_token(identity=str(user.id))
        return {"message": "Google login successful", "access_token": access_token}, 200
