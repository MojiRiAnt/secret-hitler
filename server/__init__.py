from flask import (Flask,)

app = Flask (
    __name__,
    template_folder='resources/templates',
)
app.config.update({
    "FLASK_ENV" : "development",
})

import server.routes
