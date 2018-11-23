from flask import (render_template, request, redirect, url_for)
from server import (app,)

@app.route('/host')
def host():
    return render_template('host.html')

@app.route('/test')
def test():
    return "<h1>Success!</h1>"

