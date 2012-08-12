import os
from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index_v2.html")

@app.route('/portfolio')
def portfolio():
    return render_template("portfolio.html")

@app.route('/cv')
def cv():
    return render_template("index_960.html")

@app.route('/blog/')
def blog():
    return render_template("blog.html")

@app.route('/projects')
def projects():
    return render_template("projects.html")

@app.route('/links')
def links():
    return render_template("links.html")

@app.route('/cv')
def cv():
    return render_template("cv.html")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
