from app import app  
from models import db, Inventory

# List of inventory items
inventory_items = [
    Inventory(item_name="Sofa", category="Furniture", property_id=1),
    Inventory(item_name="Dining Table", category="Furniture", property_id=2),
    Inventory(item_name="Refrigerator", category="Appliances", property_id=1),
    Inventory(item_name="Microwave", category="Appliances", property_id=3),
    Inventory(item_name="Bed", category="Furniture", property_id=2),
    Inventory(item_name="Office Chair", category="Furniture", property_id=1),
    Inventory(item_name="Bookshelf", category="Furniture", property_id=3),
    Inventory(item_name="Table Lamp", category="Decor", property_id=2),
    Inventory(item_name="Fan", category="Appliances", property_id=3),
    Inventory(item_name="Coffee Table", category="Furniture", property_id=1),
    Inventory(item_name="Washing Machine", category="Appliances", property_id=2),
    Inventory(item_name="TV Stand", category="Furniture", property_id=1),
    Inventory(item_name="Wardrobe", category="Furniture", property_id=3),
    Inventory(item_name="Dresser", category="Furniture", property_id=2),
    Inventory(item_name="Blender", category="Appliances", property_id=3),
    Inventory(item_name="Toaster", category="Appliances", property_id=1),
    Inventory(item_name="Desk", category="Furniture", property_id=2),
    Inventory(item_name="Air Conditioner", category="Appliances", property_id=3),
    Inventory(item_name="Rug", category="Decor", property_id=1),
    Inventory(item_name="Nightstand", category="Furniture", property_id=2),
]

# Insert items into the database
with app.app_context():
    db.session.bulk_save_objects(inventory_items)
    db.session.commit()
    print("Inventory items added successfully!")
