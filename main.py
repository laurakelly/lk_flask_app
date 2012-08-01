from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index_960.html")

@app.route('/portfolio')
def portfolio():
    return render_template("portfolio.html")

@app.route('/cv')
def cv():
    return render_template("index_960.html")

@app.route('/blog/')
def blog():
    return render_template("index_960.html")

@app.route('/projects')
def projects():
    return render_template("projects.html")

@app.route('/links')
def links():
    return render_template("links.html")

if __name__ == '__main__':
    app.run('0.0.0.0')
