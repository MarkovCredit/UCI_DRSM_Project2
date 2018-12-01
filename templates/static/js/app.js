var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017/";

MongoClient.connect(mongoUrl, function(err, db) {
  if (err) throw err;
  var db_jobs = db.db("jobs_db");
  db_jobs.collection("job_listings").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
}); 

//------------------------------------------------------
// Display Table
var tbody = d3.select("tbody");
result.forEach((data) => {
  var row = tbody.append("tr");
  Object.entries(data).forEach(([key, value]) => {
    var cell = tbody.append("td");
    cell.text(value);
  });
});

//-------------------------------------------------------
// Select Drop-down for City
var cityList = d3.select("#city");
cityList.append("option").text("-Select City-");
var cityGroup = [];
result.forEach((data) => {
	if(cityGroup.includes(data.City) === false) {
		cityGroup.push(data.City);
		cityList.append("option").text(data.City);
	}
  });

	//---------------
// Filter City
if (inputValueCity != "-Select City-") {
var filteredLocation = result.filter(data => data.City === inputValueCity);
}

	
