import datetime
from flask import current_app
from flask_restful import Resource, reqparse
from models import db, Move
from flask_jwt_extended import jwt_required, get_jwt_identity

class MovesResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        parser = reqparse.RequestParser()
        parser.add_argument('from_address', type=str, required=True, help="From address is required")
        parser.add_argument('to_address', type=str, required=True, help="To address is required")
        parser.add_argument('move_date', type=str, required=True, help="Move date is required in YYYY-MM-DD format")
        parser.add_argument('move_time', type=str, required=True, help="Move time is required in HH:MM:SS format")
        parser.add_argument('estimated_price', type=float, required=False)
        parser.add_argument('approved_price', type=float, required=False)
        parser.add_argument('distance', type=float, required=False)
        args = parser.parse_args()

        try:
            # Convert move_date and move_time strings to datetime objects.
            move_date = datetime.datetime.strptime(args['move_date'], "%Y-%m-%d")
            move_time = datetime.datetime.strptime(args['move_time'], "%H:%M:%S").time()
        except Exception as e:
            return {"message": "Invalid date or time format. Expected YYYY-MM-DD for date and HH:MM:SS for time."}, 400

        try:
            move = Move(
                user_id=user_id,
                from_address=args['from_address'],
                to_address=args['to_address'],
                move_date=move_date,
                move_time=move_time,
                estimated_price=args.get('estimated_price'),
                approved_price=args.get('approved_price'),
                distance=args.get('distance')
            )
            db.session.add(move)
            db.session.commit()
            # Manually build a response dict to avoid recursion.
            move_data = {
                "id": move.id,
                "user_id": move.user_id,
                "from_address": move.from_address,
                "to_address": move.to_address,
                "move_date": move.move_date.isoformat(),
                "move_time": move.move_time.isoformat(),
                "move_status": move.move_status,
                "estimated_price": move.estimated_price,
                "approved_price": move.approved_price,
                "distance": move.distance,
                "created_at": move.created_at.isoformat() if move.created_at else None,
                "updated_at": move.updated_at.isoformat() if move.updated_at else None,
            }
            return {"message": "Move created successfully", "move": move_data}, 201
        except Exception as e:
            current_app.logger.error(f"Error creating move: {str(e)}")
            return {"message": "Internal server error"}, 500

    @jwt_required()
    def get(self):
        try:
            moves = Move.query.all()
            moves_data = [
                move.to_dict(rules=("-bookings", "-quotes", "-user"))
                for move in moves
            ]
            return {"moves": moves_data}, 200
        except Exception as e:
            current_app.logger.error(f"Error fetching moves: {str(e)}")
            return {"message": "Internal server error"}, 500

class MoveResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        try:
            # Retrieve all moves for the current user.
            moves = Move.query.filter_by(user_id=user_id).all()
            # Serialize moves while excluding relationships that may cause recursion.
            moves_data = [
                move.to_dict(rules=("-bookings", "-quotes", "-user"))
                for move in moves
            ]
            return {"moves": moves_data}, 200
        except Exception as e:
            current_app.logger.error(f"Error fetching moves for user {user_id}: {str(e)}")
            return {"message": "Internal server error"}, 500