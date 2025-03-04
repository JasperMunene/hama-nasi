from flask import current_app
from flask_restful import Resource
from models import db, Inventory
from flask_jwt_extended import jwt_required, get_jwt_identity

class InventoryResource(Resource):
    @jwt_required()
    def get(self):
        try:
            # Query all inventory items from the database
            inventory_items = Inventory.query.all()
            # Serialize each inventory item to a dictionary, excluding relationships that cause recursion
            inventory_data = [
                item.to_dict(rules=("-inventory_users", "-property"))
                for item in inventory_items
            ]
            return {"inventory": inventory_data}, 200
        except Exception as e:
            current_app.logger.error(f"Error fetching inventory: {str(e)}")
            return {"message": "Internal server error"}, 500


