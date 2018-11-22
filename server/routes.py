from flask import (render_template,)
from server import (app,)

@app.route('/host')
def host():
    return render_template('host.html')

