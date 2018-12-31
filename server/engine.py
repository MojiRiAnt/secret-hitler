import random

minPlayersAmount = 5
maxPlayersAmount = 10

role = {'liberal': 0, 'fascist': 1, 'hitler': 2}
fascistAmounts = {5: 1, 6: 1, 7: 2, 8: 2, 9: 3, 10: 3}
liberalAmounts = {5: 3, 6: 4, 7: 4, 8: 5, 9: 5, 10: 6}

policy = {'liberal': 0, 'fascist': 1}
policiesDeck = [policy['liberal']]*6 + [policy['fascist']]*11

state = {'lobby': 0, 'presElection': 1, 'chanElection': 2, 'presPolicy': 3, 'chanPolicy': 4}
rooms = dict()

class Room():

    def __init__(self):
        self.players = dict()
        self.policies = list()
        self.policiesUsed = list()
        self.counterLiberal = 0
        self.counterFascist = 0
        self.president = 0
        #self.cannotBeElected = list()
        self.state = state['lobby']

    def startGame(self):
        self.shuffleRoles()
        self.shufflePolicies()

        self.counterLiberal = 0
        self.counterFascist = 0
        self.president = 0
        self.state = state['presElection']

    def shuffleRoles(self):
        n = len(self.players)
        roles = [role['hitler']]+[role['fascist']]*fascistAmounts[n]+[role['liberal']]*liberalAmounts[n]
        random.shuffle(roles)
        for i, name in enumerate(self.players.keys()):
            players[name] = roles[i]

    def shufflePolicies(self):
        self.policies = policiesDeck.copy()
        random.shuffle(self.policies)
        self.policiesUsed = list()
