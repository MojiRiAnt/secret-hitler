from flask import (Flask,)

app = Flask (
    __name__.split('.')[0],
    template_folder='resources/templates',
    static_folder='resources',
)

app.config.update({
    "FLASK_ENV" : "development",
})

import server.routes
