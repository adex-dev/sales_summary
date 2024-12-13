from flask import Blueprint
from dotenv import load_dotenv
from controllers.Authentication import *
from controllers.dashboardControllers import *
import os
import time
load_dotenv()


app = Blueprint('main', __name__,static_url_path='/resources', static_folder='resources')
app.secret_key = os.getenv('SECRET_KEY',"akmad_nudin")
admins = "/admin/"
users = "/users/"
proses_page="proses/"
message ="Invalid Request"
@app.route("/",methods=["GET"])
@app.route("/index",methods=["GET"])
def index():
    if "logged_in" in session:
        return redirect(url_for("main.dashboard"))
    return redirect(url_for("main.login"))

@app.route("/login",methods=['GET','POST'])
def login():
    if "logged_in" in session:
        return redirect(url_for("main.dashboard"))
    if request.method == "GET":
        return login_page()
    elif request.method == "POST":
        return login_proses_page()
    return jsonify({"status":503,"messages":message})


@app.route("/logout",methods=['GET'])
def logout():
    session.clear()
    return redirect(url_for("main.index"))

@app.route("/dashboard",methods=['GET'])
def dashboard():
    if "logged_in" not in session:
        return redirect(url_for("main.login"))
    return dashboard_page()

