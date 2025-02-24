from flask import current_app
from flask_restful import Resource
from models import db, User

class UserResource(Resource):
    def get(self):
        try:
            # Query all users
            users = User.query.all()
            # Serialize users while excluding recursive relationships
            users_data = [
                user.to_dict(rules=("-moves", "-inventory_users", "-reviews", "-payments", "-mover"))
                for user in users
            ]
            return {"users": users_data}, 200
        except Exception as e:
            current_app.logger.error(f"Error fetching users: {str(e)}")
            return {"message": "Internal server error"}, 500

class SingleUser(Resource):
    def get(self, id):
        try:
            # Get the user by id
            user = User.query.get(id)
            if not user:
                return {"message": "User not found"}, 404
            # Return serialized user, excluding recursive relationships
            return user.to_dict(rules=("-moves", "-inventory_users", "-reviews", "-payments", "-mover")), 200
        except Exception as e:
            current_app.logger.error(f"Error fetching user with id {id}: {str(e)}")
            return {"message": "Internal server error"}, 500
