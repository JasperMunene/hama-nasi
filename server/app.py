from flask import Flask
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from resources.auth_resource import SignupResource, LoginResource, LogoutResource, LoginGoogle, AuthorizeGoogle
from resources.user_resource import UserResource, SingleUser
from resources.mover_resource import MoverResource, SingleMover
from resources.inventory_resource import InventoryResource
from resources.property_resource import PropertyResource
from flask_jwt_extended import JWTManager
from extensions import bcrypt, oauth
from models import db
from dotenv import load_dotenv
import os
from blacklist import BLACKLIST
from oauth_setup import google  

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "a_default_secret_key")

# App Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://hama_nasi_wxap_user:TEaHmE0oRSyeJ1pxWdoWtFXOfGVrJbaZ@dpg-cusmagdumphs73c9a090-a.frankfurt-postgres.render.com/hama_nasi_wxap'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
app.json.compact = False

# Initialize extensions
bcrypt.init_app(app)
oauth.init_app(app)

CORS(app)
migrate = Migrate(app, db)
db.init_app(app)
jwt = JWTManager(app)

# Callback to check if a token is revoked
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload['jti']
    return jti in BLACKLIST

api = Api(app)

# A simple health-check resource
class Health(Resource):
    def get(self):
        return "Server is up and running"

# Auth routes
api.add_resource(SignupResource, '/auth/signup')
api.add_resource(LoginResource, '/auth/login')
api.add_resource(LogoutResource, '/auth/logout')
api.add_resource(LoginGoogle, '/auth/login/google')
api.add_resource(AuthorizeGoogle, '/auth/authorize/google', endpoint='authorize_google')

# User Routes
api.add_resource(UserResource, '/users')
api.add_resource(SingleUser, '/user')

#Mover Routes
api.add_resource(MoverResource, '/movers')
api.add_resource(SingleMover, '/mover')

#Inventory Route
api.add_resource(InventoryResource, '/inventory')

# Property Resource
api.add_resource(PropertyResource, '/properties')

# Health Routes
api.add_resource(Health, '/')

if __name__ == '__main__':
    app.run()
