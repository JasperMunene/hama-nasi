from flask import request, jsonify
from flask_restful import Resource
from models import db, Move, Booking
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

class BookMove(Resource):
    @jwt_required()
    def post(self):
        try:
            data = request.get_json()
            user_id = get_jwt_identity()

            # Extract move details from request body
            from_address = data.get("from_address")
            to_address = data.get("to_address")
            move_date = datetime.strptime(data.get("move_date"), "%Y-%m-%d")
            move_time = datetime.strptime(data.get("move_time"), "%H:%M").time()
            mover_id = data.get("mover_id")

            if not (from_address and to_address and move_date and move_time and mover_id):
                return {"message": "All fields are required"}, 400

            # Create a new move
            new_move = Move(
                user_id=user_id,
                from_address=from_address,
                to_address=to_address,
                move_date=move_date,
                move_time=move_time,
                move_status="Pending",
            )
            db.session.add(new_move)
            db.session.commit()

            # Create a booking for the move
            new_booking = Booking(
                move_id=new_move.id,
                mover_id=mover_id,
                status="Pending"
            )
            db.session.add(new_booking)
            db.session.commit()

            return {
                "message": "Move booked successfully",
                "move_id": new_move.id,
                "booking_id": new_booking.id
            }, 201

        except Exception as e:
            return {"message": "Error booking move", "error": str(e)}, 500


class UserMoves(Resource):
    @jwt_required()
    def get(self):
        try:
            user_id = get_jwt_identity()
            moves = Move.query.filter_by(user_id=user_id).all()

            return jsonify([{
                "id": move.id,
                "from_address": move.from_address,
                "to_address": move.to_address,
                "move_date": move.move_date.strftime("%Y-%m-%d"),
                "move_time": move.move_time.strftime("%H:%M"),
                "move_status": move.move_status
            } for move in moves])

        except Exception as e:
            return {"message": "Error retrieving moves", "error": str(e)}, 500
