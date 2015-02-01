import flask
import json
from flask import Flask, request
from flask.ext.cors import CORS
import sqlite3 as sqlite
app = Flask(__name__)
app.debug = True
app.config["CORS_HEADERS"] = "Content-Type"
cors = CORS(app)

database = sqlite.connect("orders.db")
cursor = database.cursor()

orders = []

@app.route('/order', methods=['GET','POST', 'DELETE'])
def new_order():
    if request.method == 'POST':
        # New order
        order = request.get_json(force=True)
        orders.append(order)
        return flask.jsonify(success=True)
    elif request.method == 'DELETE':
        # Bump order
        order = request.get_json(force=True)
        index = order["index"]
        del orders[index]
    else:
        # list orders
        return flask.jsonify(orders=orders)
    return "Start."

@app.route('/menu')
def menu():
    f = open("menu.json")
    menu = json.load(f)
    return flask.jsonify(**menu)

if __name__ == '__main__':
    app.run(host="0.0.0.0")
