import sys
from flask import Flask, request
from flask_cors import CORS, cross_origin
import santa
import logging


app = Flask(__name__)
cors = CORS(app, resources={r"/send-recipients": {"origins": "http://localhost:3000"}})

headers={
    'Content-type':'application/json', 
    'Accept':'application/json'
}

@app.route('/send-recipients', methods=['POST'])
@cross_origin()
def send_recipients():
    """
    Main route for sending emails to participants
    """
    print("Received request to send emails", file=sys.stdout)
    print(request.json, file=sys.stdout)
    participants = santa.get_participants_as_list(request.json)
    # santa.assign_gifts(participants)
    # santa.send_emails(participants)
    return "Emails sent!" 