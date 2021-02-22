from flask import Blueprint

from .extensions import mongo 

main = Blueprint('main', __name__)

@main.route('/')
def index():
    user_collection = mongo.db.users
    user_collection.insert({'name' : 'Binay'})
    user_collection.insert({'name' : 'Kash'})
    return '<h1>Added a User!</h1>'