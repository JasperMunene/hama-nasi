"""Initial Migration

Revision ID: 9963a8d27d81
Revises: 
Create Date: 2025-02-22 08:56:19.446068

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9963a8d27d81'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('movers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('company_name', sa.String(length=150), nullable=False),
    sa.Column('email', sa.String(length=150), nullable=False),
    sa.Column('phone', sa.String(length=15), nullable=False),
    sa.Column('rating', sa.Float(), nullable=True),
    sa.Column('availability_status', sa.String(length=50), nullable=True),
    sa.Column('house_type', sa.String(length=100), server_default='None', nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('company_name'),
    sa.UniqueConstraint('email')
    )
    op.create_table('properties',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('property_type', sa.String(length=100), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('inventory',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('item_name', sa.String(length=150), nullable=False),
    sa.Column('category', sa.String(length=100), nullable=True),
    sa.Column('property_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['property_id'], ['properties.id'], name=op.f('fk_inventory_property_id_properties'), ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=150), nullable=False),
    sa.Column('email', sa.String(length=150), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=True),
    sa.Column('phone', sa.String(length=15), nullable=True),
    sa.Column('location', sa.String(length=255), nullable=True),
    sa.Column('role', sa.String(length=50), nullable=False),
    sa.Column('mover_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['mover_id'], ['movers.id'], name=op.f('fk_users_mover_id_movers'), ondelete='SET NULL'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('name')
    )
    op.create_table('inventory_users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('inventory_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=True),
    sa.Column('condition', sa.String(length=50), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['inventory_id'], ['inventory.id'], name=op.f('fk_inventory_users_inventory_id_inventory'), ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_inventory_users_user_id_users'), ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('moves',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('from_address', sa.String(length=255), nullable=True),
    sa.Column('to_address', sa.String(length=255), nullable=True),
    sa.Column('move_date', sa.DateTime(), nullable=False),
    sa.Column('move_time', sa.Time(), nullable=False),
    sa.Column('move_status', sa.String(length=50), nullable=True),
    sa.Column('estimated_price', sa.Float(), nullable=True),
    sa.Column('approved_price', sa.Float(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_moves_user_id_users'), ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('mover_id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Float(), nullable=False),
    sa.Column('review_text', sa.Text(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['mover_id'], ['movers.id'], name=op.f('fk_reviews_mover_id_movers'), ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_reviews_user_id_users'), ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('move_id', sa.Integer(), nullable=False),
    sa.Column('mover_id', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['move_id'], ['moves.id'], name=op.f('fk_bookings_move_id_moves'), ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['mover_id'], ['movers.id'], name=op.f('fk_bookings_mover_id_movers'), ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('payments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('move_id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('payment_status', sa.String(length=50), nullable=True),
    sa.Column('payment_method', sa.String(length=50), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['move_id'], ['moves.id'], name=op.f('fk_payments_move_id_moves'), ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_payments_user_id_users'), ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('quotes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('mover_id', sa.Integer(), nullable=False),
    sa.Column('move_id', sa.Integer(), nullable=False),
    sa.Column('quote_amount', sa.Float(), nullable=False),
    sa.Column('details', sa.Text(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['move_id'], ['moves.id'], name=op.f('fk_quotes_move_id_moves'), ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['mover_id'], ['movers.id'], name=op.f('fk_quotes_mover_id_movers'), ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('quotes')
    op.drop_table('payments')
    op.drop_table('bookings')
    op.drop_table('reviews')
    op.drop_table('moves')
    op.drop_table('inventory_users')
    op.drop_table('users')
    op.drop_table('inventory')
    op.drop_table('properties')
    op.drop_table('movers')
    # ### end Alembic commands ###
