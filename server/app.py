from flask import Flask
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS

from models import db
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://hama:Lj8jwxkc15s2VFntKkYWVrlflV9EfJNY@dpg-cuqm5jrv2p9s73fgaif0-a.frankfurt-postgres.render.com/hama_b29f'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)

class health(Resource):
    def get(self):
        return f"Server is up and running"

api.add_resource(health, '/')

if __name__ == '__main__':
    app.run()