import os

from flask import render_template
from flask import request

from fri3d import api

@api.route("/")
def render_default():
  return render_template("default.html")
