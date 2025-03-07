from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import MetaData

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# Users Table
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=True)
    phone = db.Column(db.String(15))
    image = db.Column(db.String(255), nullable=True)
    location = db.Column(db.String(255))
    role = db.Column(db.String(50), default='User', nullable=False)
    mover_id = db.Column(db.Integer, db.ForeignKey('movers.id', ondelete="SET NULL"), nullable=True)
    house_type = db.Column(db.String(100), server_default='None', nullable=False)
    otp_code = db.Column(db.String(6), nullable=True)
    otp_expires_at = db.Column(db.DateTime, nullable=True)
    is_verified = db.Column(db.Boolean, default=False)
    reset_token = db.Column(db.String(64), nullable=True)
    reset_expires_at = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    # Relationships
    moves = db.relationship('Move', backref='user', lazy=True, cascade="all, delete-orphan")
    inventory_users = db.relationship('InventoryUser', backref='user', lazy=True, cascade="all, delete-orphan")
    reviews = db.relationship('Review', backref='user', lazy=True, cascade="all, delete-orphan")
    payments = db.relationship('Payment', backref='user', lazy=True, cascade="all, delete-orphan")

# Movers Table
class Mover(db.Model, SerializerMixin):
    __tablename__ = 'movers'

    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=True)
    phone = db.Column(db.String(15), nullable=False)
    image = db.Column(db.String(255), nullable=True)
    rating = db.Column(db.Float, default=0.0)
    availability_status = db.Column(db.String(50), default='Available')
    house_type = db.Column(db.String(100), server_default='None', nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    # Relationships
    quotes = db.relationship('Quote', backref='mover', lazy=True, cascade="all, delete-orphan")
    bookings = db.relationship('Booking', backref='mover', lazy=True, cascade="all, delete-orphan")
    reviews = db.relationship('Review', backref='mover', lazy=True, cascade="all, delete-orphan")
    users = db.relationship('User', backref='mover', lazy=True)

# Properties Table
class Property(db.Model, SerializerMixin):
    __tablename__ = 'properties'

    id = db.Column(db.Integer, primary_key=True)
    property_type = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    # Relationships
    inventory_items = db.relationship('Inventory', backref='property', lazy=True, cascade="all, delete-orphan")

# Inventory Table
class Inventory(db.Model, SerializerMixin):
    __tablename__ = 'inventory'

    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(150), nullable=False)
    image = db.Column(db.String(900))
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id', ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    # Relationships
    inventory_users = db.relationship('InventoryUser', backref='inventory', lazy=True, cascade="all, delete-orphan")

# Inventory User Table
class InventoryUser(db.Model, SerializerMixin):
    __tablename__ = 'inventory_users'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    inventory_id = db.Column(db.Integer, db.ForeignKey('inventory.id', ondelete="CASCADE"), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    condition = db.Column(db.String(50))
    priority = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

# Moves Table
class Move(db.Model, SerializerMixin):
    __tablename__ = 'moves'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    from_address = db.Column(db.String(255))
    to_address = db.Column(db.String(255))
    move_date = db.Column(db.DateTime, nullable=False)
    move_time = db.Column(db.Time, nullable=False)
    move_status = db.Column(db.String(50), default='Pending')
    estimated_price = db.Column(db.Float)
    approved_price = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())


    distance = db.Column(db.Float, nullable=True)

    # Relationships
    bookings = db.relationship('Booking', backref='move', lazy=True, cascade="all, delete-orphan")
    quotes = db.relationship('Quote', backref='move', lazy=True, cascade="all, delete-orphan")


# Bookings Table
class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    move_id = db.Column(db.Integer, db.ForeignKey('moves.id', ondelete="CASCADE"), nullable=False)
    mover_id = db.Column(db.Integer, db.ForeignKey('movers.id', ondelete="CASCADE"), nullable=False)
    status = db.Column(db.String(50), default='Pending')
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

# Reviews Table
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    mover_id = db.Column(db.Integer, db.ForeignKey('movers.id', ondelete="CASCADE"), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    review_text = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=db.func.now())

# Payments Table
class Payment(db.Model, SerializerMixin):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    move_id = db.Column(db.Integer, db.ForeignKey('moves.id', ondelete="CASCADE"), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_status = db.Column(db.String(50), default='Pending')
    payment_method = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())

# Quote Table
class Quote(db.Model, SerializerMixin):
    __tablename__ = 'quotes'

    id = db.Column(db.Integer, primary_key=True)
    mover_id = db.Column(db.Integer, db.ForeignKey('movers.id', ondelete="CASCADE"), nullable=False)
    move_id = db.Column(db.Integer, db.ForeignKey('moves.id', ondelete="CASCADE"), nullable=False)
    quote_amount = db.Column(db.Float, nullable=False)
    details = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())
