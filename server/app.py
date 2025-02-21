from flask import Flask
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from resources.auth_resource import SignupResource, LoginResource, LogoutResource
from flask_jwt_extended import JWTManager
from extensions import bcrypt
from models import db
from extensions import oauth
from dotenv import load_dotenv
import os
from blacklist import BLACKLIST

load_dotenv()


app = Flask(__name__)

# Initialize extensions
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://hama:Lj8jwxkc15s2VFntKkYWVrlflV9EfJNY@dpg-cuqm5jrv2p9s73fgaif0-a.frankfurt-postgres.render.com/hama_b29f'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
app.json.compact = False

bcrypt.init_app(app)
oauth.init_app(app)
google = oauth.register(
    name='google',
    client_id = os.getenv('CLIENT_ID'),
    client_secret = os.getenv('CLIENT_SECRET'),
    server_metadata_url = 'https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs = {'scope': 'openid profile email'}
)

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

api.add_resource(SignupResource, '/auth/signup')
api.add_resource(LoginResource, '/auth/login')
api.add_resource(LogoutResource, '/auth/logout')
api.add_resource( Health, '/')

if __name__ == '__main__':
    app.run()
