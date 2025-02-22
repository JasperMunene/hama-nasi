from app import app
from models import db, User, Mover, Property, Inventory, InventoryUser, Move, Booking, Review, Payment, Quote
from datetime import datetime, time, timezone


def clear_tables():
    # Clear tables in proper order; note that with circular dependencies, deletion order is critical.
    db.session.query(Quote).delete()
    db.session.query(Booking).delete()
    db.session.query(Review).delete()
    db.session.query(Payment).delete()
    db.session.query(InventoryUser).delete()
    db.session.query(Inventory).delete()
    db.session.query(Property).delete()
    db.session.query(Move).delete()
    db.session.query(Mover).delete()
    db.session.query(User).delete()
    db.session.commit()


def seed_users():
    # Create normal users and company owner users.
    users = [
        # Normal Users
        User(
            name='John Doe',
            email='johndoe@example.com',
            password='hashedpassword',
            phone='1234567890',
            location='123 Main Street',
            role='User'
        ),
        User(
            name='Jane Smith',
            email='janesmith@example.com',
            password='hashedpassword',
            phone='0987654321',
            location='456 Elm St',
            role='User'
        ),
        # Company Owners
        User(
            name='Speedy Owner',
            email='speedyowner@example.com',
            password='hashedpassword',
            phone='5550001111',
            location='789 Business Rd',
            role='Company'
        ),
        User(
            name='SafeHands Owner',
            email='safehandsowner@example.com',
            password='hashedpassword',
            phone='5550002222',
            location='101 Corporate Ave',
            role='Company'
        )
    ]
    db.session.add_all(users)
    db.session.commit()


def seed_movers():
    speedy_owner = User.query.filter_by(email='speedyowner@example.com').first()
    safehands_owner = User.query.filter_by(email='safehandsowner@example.com').first()

    mover1 = Mover(
        company_name='Speedy Movers',
        email='contact@speedymovers.com',
        phone='5551234567',
        rating=4.5,
        house_type='Residential'
    )
    mover2 = Mover(
        company_name='SafeHands Movers',
        email='contact@safehands.com',
        phone='5557654321',
        rating=4.8,
        house_type='Commercial'
    )
    db.session.add_all([mover1, mover2])
    db.session.commit()

    # Link each company owner to their mover record
    speedy_owner.mover_id = mover1.id
    safehands_owner.mover_id = mover2.id
    db.session.commit()


def seed_properties():
    properties = [
        Property(property_type='Apartment'),
        Property(property_type='House')
    ]
    db.session.add_all(properties)
    db.session.commit()


def seed_inventory():
    # Retrieve properties from the database
    apartment = Property.query.filter_by(property_type='Apartment').first()
    house = Property.query.filter_by(property_type='House').first()

    inventory_items = [
        Inventory(item_name='Sofa', category='Furniture', property_id=apartment.id),
        Inventory(item_name='Dining Table', category='Furniture', property_id=house.id)
    ]
    db.session.add_all(inventory_items)
    db.session.commit()


def seed_inventory_users():
    inventories = Inventory.query.order_by(Inventory.id).all()
    if len(inventories) < 2:
        print("Not enough inventory items found.")
        return

    # Only normal users receive inventory items.
    user1 = User.query.filter_by(email='johndoe@example.com').first()
    user2 = User.query.filter_by(email='janesmith@example.com').first()

    if not user1 or not user2:
        print("Required users not found.")
        return

    inventory_users = [
        InventoryUser(user_id=user1.id, inventory_id=inventories[0].id, quantity=1, condition='Good'),
        InventoryUser(user_id=user2.id, inventory_id=inventories[1].id, quantity=1, condition='Excellent')
    ]
    db.session.add_all(inventory_users)
    db.session.commit()


def seed_moves():
    # Moves are associated with normal users.
    user1 = User.query.filter_by(email='johndoe@example.com').first()
    user2 = User.query.filter_by(email='janesmith@example.com').first()

    moves = [
        Move(
            user_id=user1.id,
            from_address='123 Main St',
            to_address='789 Oak St',
            move_date=datetime.now(timezone.utc),
            move_time=time(10, 30),
            move_status='Pending',
            estimated_price=250.0
        ),
        Move(
            user_id=user2.id,
            from_address='456 Elm St',
            to_address='101 Pine St',
            move_date=datetime.now(timezone.utc),
            move_time=time(14, 45),
            move_status='Pending',
            estimated_price=300.0
        )
    ]
    db.session.add_all(moves)
    db.session.commit()


def seed_quotes():
    # Associate quotes with moves and movers.
    move1 = Move.query.filter_by(from_address='123 Main St').first()
    move2 = Move.query.filter_by(from_address='456 Elm St').first()
    mover1 = Mover.query.filter_by(company_name='Speedy Movers').first()
    mover2 = Mover.query.filter_by(company_name='SafeHands Movers').first()

    quotes = [
        Quote(
            mover_id=mover1.id,
            move_id=move1.id,
            quote_amount=200.0,
            details='Fast and efficient service'
        ),
        Quote(
            mover_id=mover2.id,
            move_id=move2.id,
            quote_amount=250.0,
            details='Reliable and professional service'
        )
    ]
    db.session.add_all(quotes)
    db.session.commit()


def seed_bookings():
    # Create bookings between moves and movers.
    move1 = Move.query.filter_by(from_address='123 Main St').first()
    move2 = Move.query.filter_by(from_address='456 Elm St').first()
    mover1 = Mover.query.filter_by(company_name='Speedy Movers').first()
    mover2 = Mover.query.filter_by(company_name='SafeHands Movers').first()

    bookings = [
        Booking(
            move_id=move1.id,
            mover_id=mover1.id,
            status='Confirmed'
        ),
        Booking(
            move_id=move2.id,
            mover_id=mover2.id,
            status='Pending'
        )
    ]
    db.session.add_all(bookings)
    db.session.commit()


def seed_reviews():
    # Create reviews by normal users for movers.
    user1 = User.query.filter_by(email='johndoe@example.com').first()
    user2 = User.query.filter_by(email='janesmith@example.com').first()
    mover1 = Mover.query.filter_by(company_name='Speedy Movers').first()
    mover2 = Mover.query.filter_by(company_name='SafeHands Movers').first()

    reviews = [
        Review(
            user_id=user1.id,
            mover_id=mover1.id,
            rating=5.0,
            review_text='Great service!'
        ),
        Review(
            user_id=user2.id,
            mover_id=mover2.id,
            rating=4.5,
            review_text='Very professional.'
        )
    ]
    db.session.add_all(reviews)
    db.session.commit()


def seed_payments():
    # Create payments made by normal users for their moves.
    user1 = User.query.filter_by(email='johndoe@example.com').first()
    user2 = User.query.filter_by(email='janesmith@example.com').first()
    move1 = Move.query.filter_by(from_address='123 Main St').first()
    move2 = Move.query.filter_by(from_address='456 Elm St').first()

    payments = [
        Payment(
            user_id=user1.id,
            move_id=move1.id,
            amount=250.0,
            payment_status='Completed',
            payment_method='Credit Card'
        ),
        Payment(
            user_id=user2.id,
            move_id=move2.id,
            amount=300.0,
            payment_status='Pending',
            payment_method='PayPal'
        )
    ]
    db.session.add_all(payments)
    db.session.commit()


def seed_database():
    with app.app_context():
        clear_tables()
        seed_users()
        seed_movers()
        seed_properties()
        seed_inventory()
        seed_inventory_users()
        seed_moves()
        seed_quotes()
        seed_bookings()
        seed_reviews()
        seed_payments()
        print("Database seeding complete!")


if __name__ == "__main__":
    seed_database()
