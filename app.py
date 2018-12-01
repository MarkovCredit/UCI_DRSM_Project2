from flask import (
    Flask,
    render_template,
    jsonify,
    request)
# Import pymongo library, to connect Flask app to our Mongo database.
import pymongo

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
    jobs = list(db.job_listings.find())

    # Return the template with the jobs list passed in
    return render_template('index.html', jobs=jobs)


@app.route("/send", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        company = request.form["company"]

        print(company)

        return jsonify(company)

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
