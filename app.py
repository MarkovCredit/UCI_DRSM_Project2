from flask import (
    Flask,
    render_template,
    jsonify,
    request)
# Import pymongo library, to connect Flask app to our Mongo database.
import pymongo
import pandas as pd
from pymongo import MongoClient

# Create an instance of Flask app.
app = Flask(__name__)

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.jobs_db

# Set route
@app.route('/')
def index():
    # Store the job listings collection in a list
    # Return the template with the jobs list passed in
    return render_template('index.html')
    

# Set route
@app.route('/jobs')
def jobs():
    """ Return list of jobs"""
    jobs_list = {}
    jobs_data = list(db.job_listings.find())
    df = pd.DataFrame(jobs_data)
    df = df.drop(['_id'], axis=1)
    json_data = df.to_json(orient='records')
    # Return the jobs list (it is already in json format)
    return json_data


if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
