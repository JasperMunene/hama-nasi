from flask import current_app
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Inventory, InventoryUser

# Inventory Resource (GET all, POST new item)
class InventoryResource(Resource):
    @jwt_required()
    def get(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('property_id', type=int, location='args')
            parser.add_argument('item_name', type=str, location='args')
            parser.add_argument('search', type=str, location='args')
            args = parser.parse_args()

            query = Inventory.query

            if args.get('property_id'):
                query = query.filter_by(property_id=args['property_id'])
            if args.get('item_name'):
                query = query.filter(Inventory.item_name.ilike(f"%{args['item_name']}%"))
            if args.get('search'):
                search_term = f"%{args['search']}%"
                query = query.filter(Inventory.item_name.ilike(search_term))

            inventory_items = query.all()
            inventory_data = [
                item.to_dict(rules=("-inventory_users", "-property"))
                for item in inventory_items
            ]
            return {"inventory": inventory_data}, 200
        except Exception as e:
            current_app.logger.error(f"Error fetching inventory: {str(e)}")
            return {"message": "Internal server error"}, 500

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        parser = reqparse.RequestParser()
        parser.add_argument('item_name', type=str, required=True, help="Item name cannot be blank")
        parser.add_argument('image', type=str, required=False)
        parser.add_argument('property_id', type=int, required=True, help="Property ID is required")
        args = parser.parse_args()

        try:
            new_item = Inventory(
                item_name=args['item_name'],
                image=args.get('image'),
                property_id=args['property_id']
            )
            db.session.add(new_item)
            db.session.commit()
            return {
                "message": "Inventory item added successfully",
                "inventory": new_item.to_dict(rules=("-inventory_users", "-property"))
            }, 201
        except Exception as e:
            current_app.logger.error(f"Error adding inventory item: {str(e)}")
            return {"message": "Internal server error"}, 500

# Inventory Item Resource (GET, PUT, DELETE single item)
class InventoryItemResource(Resource):
    @jwt_required()
    def get(self, inventory_id):
        try:
            item = Inventory.query.get_or_404(inventory_id)
            return item.to_dict(rules=("-inventory_users", "-property")), 200
        except Exception as e:
            current_app.logger.error(f"Error fetching inventory item {inventory_id}: {str(e)}")
            return {"message": "Internal server error"}, 500

    @jwt_required()
    def put(self, inventory_id):
        parser = reqparse.RequestParser()
        parser.add_argument('item_name', type=str)
        parser.add_argument('image', type=str)
        parser.add_argument('property_id', type=int)
        args = parser.parse_args()

        try:
            item = Inventory.query.get_or_404(inventory_id)
            if args.get('item_name'):
                item.item_name = args['item_name']
            if args.get('image'):
                item.image = args['image']
            if args.get('property_id'):
                item.property_id = args['property_id']
            db.session.commit()
            return {
                "message": "Inventory item updated successfully",
                "inventory": item.to_dict(rules=("-inventory_users", "-property"))
            }, 200
        except Exception as e:
            current_app.logger.error(f"Error updating inventory item {inventory_id}: {str(e)}")
            return {"message": "Internal server error"}, 500

    @jwt_required()
    def delete(self, inventory_id):
        try:
            item = Inventory.query.get_or_404(inventory_id)
            db.session.delete(item)
            db.session.commit()
            return {"message": "Inventory item deleted successfully"}, 200
        except Exception as e:
            current_app.logger.error(f"Error deleting inventory item {inventory_id}: {str(e)}")
            return {"message": "Internal server error"}, 500

# User Inventory Resource (GET user-specific inventory with filters)
class UserInventoryResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('inventory_id', type=int, location='args')
            parser.add_argument('condition', type=str, location='args')
            parser.add_argument('priority', type=str, location='args')
            parser.add_argument('search', type=str, location='args')
            args = parser.parse_args()

            query = InventoryUser.query.filter_by(user_id=user_id)

            if args.get('inventory_id'):
                query = query.filter_by(inventory_id=args['inventory_id'])
            if args.get('condition'):
                query = query.filter_by(condition=args['condition'])
            if args.get('priority'):
                query = query.filter_by(priority=args['priority'])
            if args.get('search'):
                query = query.join(Inventory).filter(Inventory.item_name.ilike(f"%{args['search']}%"))

            user_inventory = query.all()
            inventory_data = [record.to_dict(rules=("-inventory",)) for record in user_inventory]
            return {"inventory": inventory_data}, 200
        except Exception as e:
            current_app.logger.error(f"Error fetching inventory for user {user_id}: {str(e)}")
            return {"message": "Internal server error"}, 500

# Delete User Inventory Record
class DeleteUserInventoryResource(Resource):
    @jwt_required()
    def delete(self, inventory_user_id):
        user_id = get_jwt_identity()
        try:
            record = InventoryUser.query.filter_by(id=inventory_user_id, user_id=user_id).first()
            if not record:
                return {"message": "Inventory record not found"}, 404
            db.session.delete(record)
            db.session.commit()
            return {"message": "Inventory record deleted successfully"}, 200
        except Exception as e:
            current_app.logger.error(f"Error deleting inventory record {inventory_user_id}: {str(e)}")
            return {"message": "Internal server error"}, 500

# Update User Inventory Record
class PatchUserInventoryResource(Resource):
    @jwt_required()
    def patch(self, inventory_user_id):
        user_id = get_jwt_identity()
        parser = reqparse.RequestParser()
        parser.add_argument('quantity', type=int)
        parser.add_argument('condition', type=str)
        parser.add_argument('priority', type=str)
        args = parser.parse_args()
        try:
            record = InventoryUser.query.filter_by(id=inventory_user_id, user_id=user_id).first()
            if not record:
                return {"message": "Inventory record not found"}, 404
            if args.get('quantity') is not None:
                record.quantity = args['quantity']
            if args.get('condition') is not None:
                record.condition = args['condition']
            if args.get('priority') is not None:
                record.priority = args['priority']
            db.session.commit()
            return {
                "message": "Inventory record updated successfully",
                "inventory": record.to_dict()
            }, 200
        except Exception as e:
            current_app.logger.error(f"Error updating inventory record {inventory_user_id}: {str(e)}")
            return {"message": "Internal server error"}, 500


