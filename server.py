from flask import (Flask, render_template,)

app = Flask (
    __name__,
    template_folder='resources/templates',
)

app.config.update({
    "FLASK_ENV" : "development",
})

@app.route('/hitler/create')
def hitler_create():
    return render_template('test.html', route_token='hitler-create')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) # WARNING : Debug mode enabled
