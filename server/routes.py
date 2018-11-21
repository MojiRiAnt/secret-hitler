from flask import (render_template,)
from server import (app,)

@app.route('/hitler/create')
def hitler_create():
    return render_template('test.html', route_token='hitler-create')

