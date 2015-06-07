import os
from flask import Flask, render_template, url_for, redirect

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/resume')
def resume():
    return render_template("resume.html")

@app.route('/portfolio')
def portfolio():
    return render_template("portfolio.html")

@app.route('/women2')
def women2():
    return redirect('http://www.women2.com/two-student-programmers-build-their-1st-webapp-place-2nd-at-developher/')

@app.route('/neuron')
def neuron():
    return redirect('http://www.ncbi.nlm.nih.gov/pubmed/22153366')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
