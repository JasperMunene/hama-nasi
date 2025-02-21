from flask import Flask
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from resources.auth_resource import SignupResource, LoginResource
from flask_jwt_extended import JWTManager
from extensions import bcrypt  # Import from extensions
from models import db

app = Flask(__name__)

# Initialize extensions
bcrypt.init_app(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://hama:Lj8jwxkc15s2VFntKkYWVrlflV9EfJNY@dpg-cuqm5jrv2p9s73fgaif0-a.frankfurt-postgres.render.com/hama_b29f'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'secret'
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)
db.init_app(app)
jwt = JWTManager(app)

api = Api(app)

# A simple health-check resource
class Health(Resource):
    def get(self):
        return "Server is up and running"

api.add_resource(SignupResource, '/auth/signup')
api.add_resource(LoginResource, '/auth/login')
api.add_resource(Health, '/')

if __name__ == '__main__':
    app.run()
