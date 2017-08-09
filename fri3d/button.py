import os

from flask import render_template
from flask import request

from fri3d import api

@api.route("/button")
def render_button():
  return render_template("button.html")
