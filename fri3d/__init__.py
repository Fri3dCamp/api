import os

from flask import Flask
import flask_restful
from flask_pymongo import PyMongo
from flask import make_response
from bson.json_util import dumps

MONGO_URI = os.environ.get('MONGODB_URI')
if not MONGO_URI:
  MONGO_URI = "mongodb://fri3d:fri3d@localhost:27017/fri3d";

api = Flask(__name__)

api.config['MONGO_URI'] = MONGO_URI
mongo = PyMongo(api)

def output_json(obj, code, headers=None):
  resp = make_response(dumps(obj), code)
  resp.headers.extend(headers or {})
  return resp

DEFAULT_REPRESENTATIONS = {'application/json': output_json}
rest = flask_restful.Api(api)
rest.representations = DEFAULT_REPRESENTATIONS

import fri3d.default
import fri3d.button
