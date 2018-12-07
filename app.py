from flask import (
    Flask,
    render_template,
    jsonify,
    request)
# Import pymongo library, to connect Flask app to our Mongo database.
import pymongo
import pandas as pd

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


# @app.route('/test')
# def jobs():
#      return render_template('index2.html')

# @app.route("/metadata/<sample>")
# def sample_metadata(sample):
#     """Return the MetaData for a given sample."""
#     sel = [
#         Samples_Metadata.sample,
#         Samples_Metadata.ETHNICITY,
#         Samples_Metadata.GENDER,
#         Samples_Metadata.AGE,
#         Samples_Metadata.LOCATION,
#         Samples_Metadata.BBTYPE,
#         Samples_Metadata.WFREQ,
#     ]

#     results = db.session.query(*sel).filter(Samples_Metadata.sample == sample).all()

#     # Create a dictionary entry for each row of metadata information
#     sample_metadata = {}
#     for result in results:
#         sample_metadata["sample"] = result[0]
#         sample_metadata["ETHNICITY"] = result[1]
#         sample_metadata["GENDER"] = result[2]
#         sample_metadata["AGE"] = result[3]
#         sample_metadata["LOCATION"] = result[4]
#         sample_metadata["BBTYPE"] = result[5]
#         sample_metadata["WFREQ"] = result[6]

#     print(sample_metadata)
#     return jsonify(sample_metadata)

if __name__ == "__main__":
    app.run(debug=True)
