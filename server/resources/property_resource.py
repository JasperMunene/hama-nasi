from flask import current_app
from flask_restful import Resource
from models import db, Property
from flask_jwt_extended import jwt_required

class PropertyResource(Resource):
    @jwt_required()
    def get(self):
        try:
            # Query all properties
            properties = Property.query.all()
            # Serialize each property to a dictionary, excluding inventory_items to avoid recursion
            properties_data = [
                prop.to_dict(rules=("-inventory_items",))
                for prop in properties
            ]
            return {"properties": properties_data}, 200
        except Exception as e:
            current_app.logger.error(f"Error fetching properties: {str(e)}")
            return {"message": "Internal server error"}, 500
