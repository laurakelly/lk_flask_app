import os
from flask import Flask, render_template, url_for, redirect

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index_v2.html")

@app.route('/resume')
def resume():
    return render_template("d3_resume.html")

@app.route('/portfolio')
def portfolio():
    return render_template("portfolio.html")

@app.route('/women2')
def women2():
    return redirect('http://www.women2.com/two-student-programmers-build-their-1st-webapp-place-2nd-at-developher/')

@app.route('/neuron')
def neuron():
    return redirect('http://www.ncbi.nlm.nih.gov/pubmed/22153366')

if __name__== "__main__":
    app.run()
