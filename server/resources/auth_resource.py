from flask_restful import Resource, reqparse
from models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from extensions import bcrypt
from blacklist import BLACKLIST

class SignupResource(Resource):
    def post(self):
        # Validate required fields using reqparse
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, help="Name cannot be blank!")
        parser.add_argument('email', type=str, required=True, help="Email cannot be blank!")
        parser.add_argument('password', type=str, required=True, help="Password cannot be blank!")
        args = parser.parse_args()

        # Check if a user with the same email already exists
        if User.query.filter_by(email=args['email']).first():
            return {"message": "User with that email already exists"}, 400

        # Hash the user's password and decode it to UTF-8 for storage as a string
        hashed_password = bcrypt.generate_password_hash(args['password']).decode('utf-8')

        # Create a new user instance
        new_user = User(
            name=args['name'],
            email=args['email'],
            password=hashed_password,
        )

        # Save the user in the database
        db.session.add(new_user)
        db.session.commit()

        # Generate a JWT token with the new user's id as the identity
        access_token = create_access_token(identity=str(new_user.id))

        return {
            "message": "User created successfully",
            "access_token": access_token
        }, 201

class LoginResource(Resource):
    def post(self):
        # Validate required fields using reqparse
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True, help="Email is required!")
        parser.add_argument('password', type=str, required=True, help="Password is required!")
        args = parser.parse_args()

        # Find the user by email
        user = User.query.filter_by(email=args['email']).first()
        if not user:
            return {"message": "Invalid email or password"}, 401

        # Verify the password
        if not bcrypt.check_password_hash(user.password, args['password']):
            return {"message": "Invalid email or password"}, 401

        # Generate a JWT token for the user
        access_token = create_access_token(identity=str(user.id))

        return {
            "message": "Login successful",
            "access_token": access_token
        }, 200

class LogoutResource(Resource):
    @jwt_required()
    def post(self):
        # Extract the token's unique identifier (jti)
        jti = get_jwt()["jti"]
        BLACKLIST.add(jti)
        return {"message": "Successfully logged out"}, 200