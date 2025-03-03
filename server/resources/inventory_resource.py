from flask import request, jsonify
from flask_restful import Resource
from models import db, Inventory

class InventoryResource(Resource):
    def get(self):
        """Fetch all inventory items."""
        inventory_items = Inventory.query.all()
        return jsonify([item.to_dict() for item in inventory_items])
    
    def post(self):
        """Add a new inventory item."""
        data = request.get_json()
        new_item = Inventory(
            item_name=data.get('item_name'),
            category=data.get('category'),
            property_id=data.get('property_id')  # Ensure property_id is valid
        )
        db.session.add(new_item)
        db.session.commit()
        return jsonify(new_item.to_dict()), 201

class SingleInventoryResource(Resource):
    def put(self, id):
        """Update an inventory item."""
        item = Inventory.query.get_or_404(id)
        data = request.get_json()
        item.item_name = data.get('item_name', item.item_name)
        item.category = data.get('category', item.category)
        db.session.commit()
        return jsonify(item.to_dict())
    
    def delete(self, id):
        """Delete an inventory item."""
        item = Inventory.query.get_or_404(id)
        db.session.delete(item)
        db.session.commit()
        return '', 204
