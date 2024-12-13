import io
import os
import timeit
from random import randint
from flask import redirect, render_template, request, session,url_for,jsonify
from dotenv import load_dotenv


load_dotenv()
token = os.getenv("TOKEN")
def login_page():
    data={
        "key1" : randint(0,10),
        "key2" :randint(0,5)
    }
    return render_template("login.html",**data)

def login_proses_page():
    answer = request.form.get("answer")
    asking = request.form.get("asking")
    username = request.form.get("username")
    password = request.form.get("password")
    if not [asking,answer, username,password]:
        return jsonify({"error":"Please fill all fields",'status':204})
    elif asking != answer:
        return jsonify({"messages":"Incorrect Answer",'status':304})
    elif username.lower() == "admin" and password.lower() == "qaz1234":
        session['logged_in'] =True
        return jsonify({"messages":"Welcome Admin",'status':200,"links":"dashboard"})
    else:
        pass
    return jsonify({"messages":"Incorrect Username or Password",'status':304})