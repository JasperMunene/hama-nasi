import datetime
from flask import current_app
from flask_restful import Resource, reqparse
from models import db, Quote
from flask_jwt_extended import jwt_required, get_jwt_identity

class QuoteResource(Resource):
    @jwt_required()
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('move_id', type=int, required=True, help='Move id is required')
        parser.add_argument('quote_amount', type=float, required=True, help='Quote amount is required')
        parser.add_argument('details', type=str, required=False)
        args = parser.parse_args()

        # Use JWT identity as the mover_id
        mover_id = get_jwt_identity()

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
                'quote': new_quote.to_dict()  # SerializerMixin provides to_dict()
            }, 201
        except Exception as e:
            db.session.rollback()
            current_app.logger.error(f"Error creating quote: {e}")
            return {'message': 'Failed to create quote'}, 500
