from flask import Flask
from flask.helpers import make_response
from scrapeTrails import trail_scrape
from flask import jsonify, request
import os
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config["MONGO_URI"]=os.environ.get('MONGO_URI')
bcrypt = Bcrypt(app)
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

@app.route('/getTrails')
def get_all_trails():
    trails = mongo.db.Trails
    output = []
    for trail in trails.find():
        name = trail['name'][5:]
        url = ""
        if trail['image']:
            if trail['image'][0:2] == '("':
                url = trail['image'][2:-2]
            elif trail['image'][0] == '(' and trail['image'][1] != '"':
                url = trail['image'][1:-1]
        output.append({'name' : name, 'location' : trail['location'], 'length': trail['length'], \
                'duration': trail['duration'], 'image': url, \
                'difficulty': trail['difficulty']})
    return jsonify({'result': output})

@app.route('/getDifficultTrails', methods = ['POST'])
def get_difficult_trails():
    difficulty = request.form['difficulty']
    trails = mongo.db.Trails
    output = []
    for trail in trails.find():
        if trail['difficulty'] == difficulty:
            url = ""
            if trail['image']:
                if trail['image'][0:2] == '("':
                    url = trail['image'][2:-2]
                elif trail['image'][0] == '(' and trail['image'][1] != '"':
                    url = trail['image'][1:-1]
            output.append({'name' : trail['name'], 'location' : trail['location'], \
                'length': trail['length'], 'duration': trail['duration'], 'image': url, \
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
            url = ""
            if trail['image']:
                if trail['image'][0:2] == '("':
                    url = trail['image'][2:-2]
                elif trail['image'][0] == '(' and trail['image'][1] != '"':
                    url = trail['image'][1:-1]
            output.append({'name' : trail['name'], 'location' : trail['location'], \
                'length': trail['length'], 'duration': trail['duration'], 'image': url, \
                    'difficulty': trail['difficulty']})
    return jsonify({'result': output})

@app.route('/register',methods = ['POST'])
def registerUser():
    username = request.json['username']
    password = request.json['password']
    firstname = request.json['firstname']
    lastname = request.json['lastname']
    usertype = request.json['type']

    exists = mongo.db.users.find_one({'username':username})
    if exists is None:
        pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        mongo.db.users.insert_one({'username':username,'password':pw_hash,"firstname":firstname,"lastname":lastname,'type':usertype})
        user = mongo.db.users.find_one({'username':username})
        returndict= {}
        for key in dict.keys(user):
            if key == "password":
                continue
            if key == '_id':
                returndict[key] = str(user[key])
            else:
                returndict[key] = user[key]
        return make_response({"result":returndict},200)

    return make_response({"result":"User already exists"},400)

@app.route('/login',methods = ['POST'])
def loginUser():
    username = request.json['username']
    password = request.json['password']
    
    exists = mongo.db.users.find_one({'username':username})
    if exists is None:
        return make_response({"result":"User doesn't exists"},404)
    
    if bcrypt.check_password_hash(exists['password'],password):
        returndict= {}
        for key in dict.keys(exists):
            if key == "password":
                continue
            if key == '_id':
                returndict[key] = str(exists[key])
            else:
                returndict[key] = exists[key]

        return make_response({"result":returndict},200)

    return make_response({"result":"Incorrect password"},404)
if __name__ == "__main__":
    # logging.info("Starting application ...")
    
    MONGO_URI = 'mongodb+srv://TrailChaser:trailchaser123@trailchaser.gl5n4.mongodb.net/TrailChaser?retryWrites=true&w=majority'

    # MONGO_URI = os.environ.get('MONGO_URI')
    app.config["MONGO_URI"] = MONGO_URI
    mongo.init_app(app)
    
    app.run(host='0.0.0.0', port=80,debug=True)
