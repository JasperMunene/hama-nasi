from flask import current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User

class UserResource(Resource):
    def get(self):
        try:
            # Query all users
            users = User.query.all()
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
            user = User.query.get(id)
            if not user:
                return {"message": "User not found"}, 404
            return user.to_dict(rules=("-moves", "-inventory_users", "-reviews", "-payments", "-mover")), 200
        except Exception as e:
            current_app.logger.error(f"Error fetching user with id {id}: {str(e)}")
            return {"message": "Internal server error"}, 500


class CurrentUser(Resource):
    @jwt_required()
    def get(self):
        try:
            user_id = get_jwt_identity()
            user = User.query.get(user_id)
            if not user:
                return {"message": "User not found"}, 404
            return user.to_dict(rules=("-moves", "-inventory_users", "-reviews", "-payments", "-mover")), 200
        except Exception as e:
            current_app.logger.error(f"Error fetching logged-in user: {str(e)}")
            return {"message": "Internal server error"}, 500
