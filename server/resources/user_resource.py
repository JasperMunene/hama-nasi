from flask import current_app
from flask_restful import Resource, reqparse
from models import db, User
from flask_jwt_extended import jwt_required, get_jwt_identity

class UserResource(Resource):
    @jwt_required()
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
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        try:
            # Get the user by id
            user = User.query.get(user_id)
            if not user:
                return {"message": "User not found"}, 404
            # Return serialized user, excluding recursive relationships
            return user.to_dict(rules=("-moves", "-inventory_users", "-reviews", "-payments", "-mover")), 200
        except Exception as e:
            current_app.logger.error(f"Error fetching user with id {id}: {str(e)}")
            return {"message": "Internal server error"}, 500

    @jwt_required()
    def patch(self):
        user_id = get_jwt_identity()
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('email', type=str)
        parser.add_argument('phone', type=str)
        parser.add_argument('location', type=str)
        parser.add_argument('role', type=str)
        parser.add_argument('mover_id', type=str)
        parser.add_argument('house_type', type=str)
        args = parser.parse_args()

        try:
            user = User.query.get(user_id)
            if not user:
                return {"message": "User not found"}, 404

            # Update provided fields
            if args.get('name') is not None:
                user.name = args['name']
            if args.get('email') is not None:
                user.email = args['email']
            if args.get('phone') is not None:
                user.phone = args['phone']
            if args.get('location') is not None:
                user.location = args['location']
            if args.get('role') is not None:
                user.role = args['role']
            if args.get('house_type') is not None:
                user.house_type = args['house_type']  # Corrected assignment
            if args.get('mover_id') is not None:
                user.mover_id = args['mover_id']

            db.session.commit()

            return user.to_dict(rules=("-moves", "-inventory_users", "-reviews", "-payments", "-mover")), 200
        except Exception as e:
            current_app.logger.error(f"Error updating user with id {user_id}: {str(e)}")
            return {"message": "Internal server error"}, 500
