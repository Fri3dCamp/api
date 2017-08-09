import os

from flask import render_template
from flask import request

from flask import request, abort
from flask_restful import Resource

from fri3d import api, rest, mongo

@api.route("/button")
def render_button():
  return render_template("button.html")

class Button(Resource):
  def get(self):
    try:
      args = request.args
      target = args["target"]
      return [ x for x in mongo.db.button.aggregate([
        {"$match"  : { "_id" : target } },
        {"$project": { "count": {"$size": "$users"}}}
      ]) ][0]["count"]
    except Exception as e:
      return 0

  def post(self):
    try:
      data = request.get_json()
      target = data["target"]
      token = request.cookies.get("fri3d")
      # TODO map token to user
      user = token

      # get current set of users for target and toggle user
      record = mongo.db.button.find_one({"_id" : target})
      users = []
      if record:
        users = record["users"]
        if user in users:
          users.remove(user)
        else:
          users.append(user)
      else:
        users.append(user)

      # update/create record
      result = mongo.db.button.update_one(
        { "_id" : target },
        { "$set" : { "users": users } },
        upsert=True
      )
      return result.matched_count == 1 or (not result.upserted_id is None)
    except Exception as e:
      return False

rest.add_resource(Button,
  "/api/button"
)
