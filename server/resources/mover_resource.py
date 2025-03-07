from flask import current_app
from flask_restful import Resource, reqparse
from models import db, Mover, User
from flask_jwt_extended import jwt_required, get_jwt_identity

class MoverResource(Resource):
    # @jwt_required()
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('company_name', type=str, required=True, help="Company name cannot be blank!")
        parser.add_argument('email', type=str, required=False, help="Email cannot be blank!")
        parser.add_argument('phone', type=str, required=True, help="Phone cannot be blank!")
        parser.add_argument('house_type', type=str, required=False)
        args = parser.parse_args()

        try:
            # Check if a mover with the same company name or email already exists
            if Mover.query.filter(
                (Mover.company_name == args['company_name'])
            ).first():
                return {"message": "Mover with the given company name or email already exists"}, 400

            mover = Mover(
                company_name=args['company_name'],
                email=args['email'],
                phone=args['phone'],
                house_type=args.get('house_type') or "None"
            )
            db.session.add(mover)
            db.session.commit()

            return mover.to_dict(), 201

        except Exception as e:
            current_app.logger.error(f"Error creating mover: {str(e)}")
            return {"message": "Internal server error"}, 500

    # Get all movers
    @jwt_required()
    def get(self):
        try:
            # Query all mover records
            movers = Mover.query.all()
            # Serialize movers while excluding recursive relationships
            movers_data = [
                mover.to_dict(rules=("-quotes", "-bookings", "-reviews", "-users"))
                for mover in movers
            ]
            return {"movers": movers_data}, 200
        except Exception as e:
            current_app.logger.error(f"Error fetching movers: {str(e)}")
            return {"message": "Internal server error"}, 500


class SingleMover(Resource):
    @jwt_required()
    def get(self):
        try:
            # Get the currently logged in user's ID from the JWT
            user_id = get_jwt_identity()
            # Retrieve the user from the database
            user = User.query.get(user_id)
            if not user:
                return {"message": "User not found"}, 404

            # Check if the user is associated with a mover
            if not user.mover_id:
                return {"message": "No mover associated with this user"}, 404

            # Retrieve the mover based on the user's mover_id
            mover = Mover.query.get(user.mover_id)
            if not mover:
                return {"message": "Mover not found"}, 404

            # Return the mover's data excluding potentially recursive relationships
            return mover.to_dict(rules=("-quotes", "-bookings", "-reviews", "-users")), 200

        except Exception as e:
            current_app.logger.error(f"Error fetching mover for user {user_id}: {str(e)}")
            return {"message": "Internal server error"}, 500

class MoverById(Resource):
    @jwt_required()
    def get(self, mover_id):
        try:
            # Retrieve the mover based on the provided mover_id
            mover = Mover.query.get(mover_id)
            if not mover:
                return {"message": "Mover not found"}, 404

            # Return the mover's data, excluding recursive relationships
            return mover.to_dict(rules=("-quotes", "-bookings", "-reviews", "-users")), 200

        except Exception as e:
            current_app.logger.error(f"Error fetching mover with id {mover_id}: {str(e)}")
            return {"message": "Internal server error"}, 500