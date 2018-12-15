maxPlayersAmount = 10
state = {'lobby': 0, 'game': 1}

class Room ():

    def __init__(self):
        self.players = list()
        self.roles = dict()
        self.state = state['lobby']

rooms = dict()
