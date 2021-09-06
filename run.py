from flask import (Flask, g, jsonify, redirect, render_template, request,
                   session, url_for)
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from db import Database

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = Database()
    return db

@app.teardown_appcontext
def close_db(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/', methods=['GET','POST'])
def index():   
    if request.method == 'POST':
        age = request.form['age']
        gender = request.form['gender']
        if age and gender:
            get_db().create_user(age, gender)
            return redirect(url_for('train'))
    return render_template('index.html')

@app.route('/train')
def train():
    return render_template('train.html')


@app.route('/test')
def test():
    return render_template('test.html')
    
@app.route('/get_user')
def get_user():
    uid = get_db().get_user()
    return jsonify({
        "uid": uid
    })

@app.route('/image_guess', methods=['POST'])
def image_guess():
    data = request.get_json()
    userID = data['uid']
    testID = data['testId']
    imgNo = data['imgNo']
    imgQuality = data['imgQuality']
    imageName = data['imageName']
    guess = data['guess']
    confidenceLevel = data['confidenceLevel']
    get_db().create_response(userID, testID, imageName, guess, confidenceLevel)
    return jsonify({
        "imgNo": imgNo,
        "imgQuality": imgQuality,
        "imageName": imageName,
        "guess": guess,
        "confidenceLevel": confidenceLevel
    })

@app.route('/finish')
def finish():
    return render_template('finish.html')

if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)
