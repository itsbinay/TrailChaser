from flask import Blueprint

from .extensions import mongo 
from .scrapeTrails import trail_scrape

main = Blueprint('main', __name__)

@main.route('/updateTrails')
def check_trails():
    trails = trail_scrape()
    print(type(trails))
    trail_data = mongo.db.Trails
    for trail in trails:
        trail_data.insert({'name': trail['name'], 'location': trail['location'], \
            'length': trail['length'], 'image': trail['image'], \
                'duration': trail['duration'], 'difficulty': trail['difficulty']})
    return '<h1>Updated Trail records!</h1>'

@main.route('/')
def index():
    return '<h1>Welcome To the Home Page!</h1>'


# def sample():
#     user_collection = mongo.db.users
#     user_collection.insert({'name' : 'Binay'})
#     user_collection.insert({'name' : 'Kash'})
#     return '<h1>Added a User!</h1>'