from flask import Flask
from scrapeTrails import trail_scrape
from flask import jsonify, request
import os
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"]=os.environ.get('MONGO_URI')
mongo = PyMongo(app)

@app.route('/updateTrails')
def check_trails():
    trails = trail_scrape()
    print(type(trails))
    trail_data = mongo.db.Trails
    for trail in trails:
        trail_data.insert({'name': trail['name'], 'location': trail['location'], \
            'length': trail['length'], 'image': trail['image'], \
                'duration': trail['duration'], 'difficulty': trail['difficulty']})
    return '<h1>Updated Trail records!</h1>'

@app.route('/homepage')
def index():
    return '<h1>Welcome To the Home Page!</h1>'

@app.route('/getTrails', methods = ['GET'])
def get_all_trails():
    trails = mongo.db.Trails
    output = []
    for trail in trails.find():
        name = trail['name'][5:]
        image = trail['image'][1:-1]
        output.append({'name' : name, 'location' : trail['location'], 'difficulty': trail['difficulty'], 'image': trail['image']})
    return jsonify({'result': output})

@app.route('/getDifficultTrails', methods = ['POST'])
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

@app.route('/getLengthTrails', methods = ['POST'])
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


if __name__ == "__main__":
    # logging.info("Starting application ...")
    
    MONGO_URI = 'mongodb+srv://TrailChaser:trailchaser123@trailchaser.gl5n4.mongodb.net/TrailChaser?retryWrites=true&w=majority'

    # MONGO_URI = os.environ.get('MONGO_URI')
    app.config["MONGO_URI"] = MONGO_URI
    mongo.init_app(app)
    
    app.run(host='0.0.0.0', port=80)
