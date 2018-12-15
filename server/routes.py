from flask import (render_template, request, redirect, url_for)
from server import (app,)
from functools import (wraps,)
import json
import server.engine as game

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

@app.route('/client/join')
@checkArgs(['name', 'nick'])
def client_join():
    roomName = request.args['name']
    playerName = request.args['nick']
    if not roomName in game.rooms:
        return "TODO_does_not_exist"
    if playerName in game.rooms[roomName].players:
        return "OK"
    if len(game.rooms[roomName].players) > game.maxPlayersAmount:
        return "TODO_full_lobby"
    game.rooms[roomName].players.append(playerName)
    return "OK"

@app.route('/client/getstatus')
@checkArgs(['nick'])
def client_getstatus():
    playerName = request.args['nick']
    roomName = None
    try:
        roomName = next(name for name, room in game.rooms.items() if playerName in room.players)
    except StopIteration:
        return "TODO_not_in_a_room"
    if roomName is None:
        return "TODO_not_in_a_room"
    if game.rooms[roomName].state == game.state['lobby']:
        return "TODO_in_a_lobby"
    return game.rooms[roomName].roles[playerName]

@app.route('/client/getpolicies')
@checkArgs(['nick'])
def client_getpolicies():
    playerName = request.args['nick']
    roomName = None
    try:
        roomName = next(name for name, room in game.rooms.items() if playerName in room.players)
    except StopIteration:
        return "TODO_not_in_a_room"
    if roomName is None:
        return "TODO_not_in_a_room"
    if game.rooms[roomName].state == game.state['lobby']:
        return json.dumps({'hasPolicies': False,})
    #TODO : Return liberal policies amount
    return json.dumps({
                        'hasPolicies': True,
                        'liberalAmount': 2,
                        'amount': 3,
                      })



@app.route('/host')
def host():
    return render_template('host.html')

@app.route('/host/create')
@checkArgs(['name'])
def host_create():
    roomName = request.args['name']
    if roomName in game.rooms:
        return "TODO_already_exists"
    game.rooms[roomName] = game.Room()
    return "OK"



@app.route('/lobby')
@checkArgs(['name'])
def lobby():
    roomName = request.args['name']
    if not roomName in game.rooms:
        return "TODO_does_not_exist"
    return render_template('lobby.html', roomName=roomName)

@app.route('/lobby/getplayers')
@checkArgs(['name'])
def lobby_getplayers():
    roomName = request.args['name']
    if not roomName in game.rooms:
        return "TODO_does_not_exist"
    return json.dumps({
                'amount' : len(game.rooms[roomName].players),
                'names' : [name for name in game.rooms[roomName].players],
            })

@app.route('/lobby/kick')
@checkArgs(['name', 'nick'])
def lobby_kick():
    roomName = request.args['name']
    playerName = request.args['nick']
    if not roomName in game.rooms:
        return "TODO_does_not_exist"
    if not playerName in game.rooms[roomName].players:
        return "TODO_no_such_player"
    game.rooms[roomName].players.remove(playerName)
    return "OK"
