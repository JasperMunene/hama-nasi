from flask import Flask
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from resources.auth_resource import (
    SignupResource, LoginResource, LogoutResource,
    LoginGoogle, AuthorizeGoogle, VerifyOTPResource, ResendOTPResource,
    ForgotPasswordResource, ResetPasswordResource
)
from resources.user_resource import UserResource, SingleUser
from resources.mover_resource import MoverResource, SingleMover, MoverById
from resources.inventory_resource import InventoryResource, UserInventoryResource, DeleteUserInventoryResource, PatchUserInventoryResource, InventoryItemResource
from resources.property_resource import PropertyResource
from resources.move_resource import MovesResource, MoveResource, SingleMove, SingleMoveResource, MovePatchResource
from resources.quote_resource import QuoteResource, MoveQuotesResource
from flask_jwt_extended import JWTManager
from extensions import bcrypt, oauth
from models import db
from dotenv import load_dotenv
import os
from blacklist import BLACKLIST
from oauth_setup import google
import resend
import datetime

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "a_default_secret_key")
resend.api_key = os.getenv("RESEND_API_KEY")

# App Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("CONNECTION_STRING")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_ACCESS_COOKIE_NAME'] = 'access_token'
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)
app.json.compact = False

# Initialize extensions
bcrypt.init_app(app)
oauth.init_app(app)

CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})


migrate = Migrate(app, db)
db.init_app(app)
jwt = JWTManager(app)

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload['jti']
    return jti in BLACKLIST

api = Api(app)

# Health-check resource
class Health(Resource):
    def get(self):
        return "Server is up and running"


# Auth routes
api.add_resource(SignupResource, '/auth/signup')
api.add_resource(LoginResource, '/auth/login')
api.add_resource(LogoutResource, '/auth/logout')
api.add_resource(LoginGoogle, '/auth/login/google')
api.add_resource(AuthorizeGoogle, '/auth/authorize/google', endpoint='authorize_google')
api.add_resource(VerifyOTPResource, '/auth/verify-otp')
api.add_resource(ResendOTPResource, '/auth/resend-otp')
api.add_resource(ForgotPasswordResource, '/auth/forgot-password')
api.add_resource(ResetPasswordResource, '/auth/reset-password')
# User Routes
api.add_resource(UserResource, '/users')
api.add_resource(SingleUser, '/user')

# Mover Routes
api.add_resource(MoverResource, '/movers')
api.add_resource(SingleMover, '/mover')
api.add_resource(MoverById, '/movers/<int:mover_id>')

# Inventory Route
api.add_resource(InventoryResource, '/inventory')
api.add_resource(InventoryItemResource, '/inventory/<int:inventory_id>')
api.add_resource(UserInventoryResource, '/inventory/user')
api.add_resource(DeleteUserInventoryResource, '/inventory/user/<int:inventory_user_id>')
api.add_resource(PatchUserInventoryResource, '/inventory/user/<int:inventory_user_id>')


# Property Resource
api.add_resource(PropertyResource, '/properties')

# Move resource
api.add_resource(MovesResource, '/moves')
api.add_resource(MoveResource, '/move')
api.add_resource(SingleMove, '/move/<int:move_id>')
api.add_resource(SingleMoveResource, '/moves/<int:move_id>')
api.add_resource(MovePatchResource, '/moves/<int:move_id>')

# Quote Resource
api.add_resource(QuoteResource, '/quote')
api.add_resource(MoveQuotesResource, '/moves/<int:move_id>/quotes')

# Health Routes
api.add_resource(Health, '/')

if __name__ == '__main__':
    app.run()
