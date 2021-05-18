from flask import Blueprint
from .extensions import mongo 
from .scrapeTrails import trail_scrape
from flask import jsonify, request

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

@main.route('/homepage')
def index():
    return '<h1>Welcome To the Home Page!</h1>'

@main.route('/getTrails', methods = ['GET'])
def get_all_trails():
    trails = mongo.db.Trails
    output = []
    for trail in trails.find():
        output.append({'name' : trail['name'], 'location' : trail['location'], 'difficulty': trail['difficulty']})
    return jsonify({'result': output})

@main.route('/getDifficultTrails', methods = ['POST'])
def get_difficult_trails():
    difficulty = request.form['difficulty']
    trails = mongo.db.Trails
    output = []
    for trail in trails.find():
        if trail['difficulty'] == difficulty:
            output.append({'name' : trail['name'], 'location' : trail['location'], \
                'length': trail['length'], 'duration': trail['duration'], 'image': trail['image'], \
                    'difficulty': trail['difficulty']})
    return jsonify({'result': output})

@main.route('/getLengthTrails', methods = ['POST'])
def get_length_trails():
    minLength = request.form['minLength']
    maxLength = request.form['maxLength']
    minLen = float(minLength.split(" ")[0])
    maxLen = float(maxLength.split(" ")[0])
    trails = mongo.db.Trails
    output = []
    for trail in trails.find():
        length = float(trail['length'].split(" ")[0])
        if length >= minLen and length <= maxLen:
            output.append({'name' : trail['name'], 'location' : trail['location'], \
                'length': trail['length'], 'duration': trail['duration'], 'image': trail['image'], \
                    'difficulty': trail['difficulty']})
    return jsonify({'result': output})

# def sample():
#     user_collection = mongo.db.users
#     user_collection.insert({'name' : 'Binay'})
#     user_collection.insert({'name' : 'Kash'})
#     return '<h1>Added a User!</h1>'