from flask import (render_template, request, redirect, url_for)
from server import (app,)
from functools import (wraps,)
import json
import server.engine as engine

mobileAgents = ['android', 'kaios', 'blackberry', 'iphone']


def checkArgs(expectedArgs):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if not all(arg in request.args for arg in expectedArgs):
                return "TODO"
            return func(*args, **kwargs)
        return wrapper
    return decorator



@app.route('/')
def client():
    agent = request.headers.get('User-Agent').lower()
    if any(os in agent for os in mobileAgents):
        return render_template('client.hh.html')
    return render_template('client.html')



@app.route('/host')
def host():
    return render_template('host.html')

@app.route('/host/create')
@checkArgs(['name'])
def host_create():
    roomName = request.args['name']
    if roomName in engine.rooms:
        return "TODO_already_exists"
    if not engine.Room.isValidName(roomName):
        return "TODO_invalid_name"
    engine.rooms[roomName] = engine.Room()
    return "OK"



@app.route('/lobby')
@checkArgs(['name'])
def lobby():
    roomName = request.args['name']
    if not roomName in engine.rooms:
        return "TODO_does_not_exist"
    return render_template('lobby.html', roomName=request.args['name'])

@app.route('/lobby/getplayers')
@checkArgs(['name'])
def lobby_getplayers():
    roomName = request.args['name']
    if not roomName in engine.rooms:
        return "TODO_does_not_exist"
    return json.dumps({
                'amount' : len(engine.rooms[roomName].players),
                'names' : [player.name for player in engine.rooms[roomName].players],
            })
