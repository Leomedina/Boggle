from flask import Flask, render_template, session, request, redirect, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = "BOGGLE_MY_MIND!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


@app.route('/')
def show_board():
    # session['boggle_board'] = boggle_game.make_board()
    session['guesses'] = []
    session['score'] = 0
    return render_template('/home.html', board=session['boggle_board'])

@app.route('/check-word')
def validate_word():
    word = request.args["guess"]
    board = session["boggle_board"]

    response = boggle_game.check_valid_word(board, word) 

    return jsonify({'result': response})

@app.route('/score', methods=["POST"])
def score():
    score_boolean = request.args["score"]

    if score_boolean is True:
        session['score'] = session["score"] + 1