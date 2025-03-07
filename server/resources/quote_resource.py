from flask import current_app
from flask_restful import Resource, reqparse
from models import db, Quote, User, Move
from flask_jwt_extended import jwt_required, get_jwt_identity

class QuoteResource(Resource):
    @jwt_required()
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('move_id', type=int, required=True, help='Move id is required')
        parser.add_argument('quote_amount', type=float, required=True, help='Quote amount is required')
        parser.add_argument('details', type=str, required=False)
        args = parser.parse_args()

        # Get the current user id from the JWT
        user_id = get_jwt_identity()

        # Query the User table to get the associated mover_id
        user = User.query.filter_by(id=user_id).first()
        if not user or not user.mover_id:
            return {'message': 'User not found or not associated with a mover'}, 404

        mover_id = user.mover_id

        # Create a new quote with the correct mover_id
        new_quote = Quote(
            mover_id=mover_id,
            move_id=args['move_id'],
            quote_amount=args['quote_amount'],
            details=args.get('details')
        )

        try:
            db.session.add(new_quote)
            db.session.commit()
            return {
                'message': 'Quote created successfully',
                'quote': new_quote.to_dict(only=[
                    'id', 'mover_id', 'move_id', 'quote_amount', 'details', 'created_at', 'updated_at'
                ])
            }, 201
        except Exception as e:
            db.session.rollback()
            current_app.logger.error(f"Error creating quote: {e}")
            return {'message': 'Failed to create quote'}, 500

    @jwt_required()
    def get(self):
        try:
            # Get the current user's ID from the JWT
            user_id = get_jwt_identity()

            # Retrieve the user from the database
            user = User.query.get(user_id)
            if not user or not user.mover_id:
                return {'message': 'User not found or not associated with a mover'}, 404

            # Retrieve all quotes for the mover associated with this user
            quotes = Quote.query.filter_by(mover_id=user.mover_id).all()

            # Serialize each quote (limiting to specific fields to avoid recursion issues)
            quotes_list = [
                quote.to_dict(only=[
                    'id', 'mover_id', 'move_id', 'quote_amount', 'details', 'created_at', 'updated_at'
                ]) for quote in quotes
            ]

            return {'quotes': quotes_list}, 200
        except Exception as e:
            current_app.logger.error(f"Error retrieving quotes: {e}")
            return {'message': 'Failed to retrieve quotes'}, 500

class MoveQuotesResource(Resource):
    @jwt_required()
    def get(self, move_id):
        try:
            # Ensure the move exists
            move = Move.query.get(move_id)
            if not move:
                return {'message': 'Move not found'}, 404

            # Retrieve all quotes for the specified move
            quotes = Quote.query.filter_by(move_id=move_id).all()

            # Serialize the quotes with selected fields
            quotes_list = [
                quote.to_dict(only=[
                    'id', 'mover_id', 'move_id', 'quote_amount', 'details', 'created_at', 'updated_at'
                ]) for quote in quotes
            ]

            return {'quotes': quotes_list}, 200
        except Exception as e:
            current_app.logger.error(f"Error retrieving quotes for move {move_id}: {e}")
            return {'message': 'Failed to retrieve quotes'}, 500