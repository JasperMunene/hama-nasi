from flask_restful import Resource, reqparse
from models import db, User
from flask_jwt_extended import create_access_token
from extensions import bcrypt

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
        access_token = create_access_token(identity=new_user.id)

        return {
            "message": "User created successfully",
            "access_token": access_token
        }, 201
