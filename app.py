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
    jobs_data = list(db.job_listings.find())
    df = pd.DataFrame(jobs_data)
    df = df.drop(['_id'], axis=1)
    json_data = df.to_json(orient='records')
    # Return the jobs list (in json format)
    return json_data

# Set route for number of jobs by State
@app.route('/state')
def state():
    """ Return list of jobs"""
    jobs_data = list(db.jobs_glassdoor.find())
    df = pd.DataFrame(jobs_data)
    df = df.drop(['_id'], axis=1)
    df = df.drop_duplicates(keep = 'first')
    df = df.loc[df["City"] != 'United States']
    
    grp_state_df = df.groupby('State')
    jobs_state_df = grp_state_df[["State"]].count()
    jobs_state_df = jobs_state_df.rename(
        columns = {"State": "Jobs_Count"}
        ).sort_values(by='Jobs_Count', ascending=False).reset_index()
    json_states_jobs = jobs_state_df.to_json(orient='records')
    # Return the jobs list (in json format)
    return json_states_jobs

# Set route for number of jobs by State
@app.route('/company')
def company():
    """ Return list of jobs"""
    jobs_data = list(db.jobs_glassdoor.find())
    df = pd.DataFrame(jobs_data)
    df = df.drop(['_id'], axis=1)
    df = df.drop_duplicates(keep = 'first')
    
    grp_company_df = df.groupby('Company')
    jobs_company_df = grp_company_df[["Company"]].count()
    jobs_company_df = jobs_company_df.rename(columns = {"Company": "Jobs_Count"}).sort_values(by='Jobs_Count', ascending=False).reset_index()
    json_company_jobs = jobs_company_df.to_json(orient='records')
    # Return the jobs list (in json format)
    return json_company_jobs

if __name__ == "__main__":
    app.run(debug=True)
