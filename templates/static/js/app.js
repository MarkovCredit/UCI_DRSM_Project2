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
d3.select("tbody")
.selectAll("tr")
.data(jobs)
.enter()
.append("tr")
.html(function(d) {
  return `<td>${d.Title}</td><td>${d.Company}</td><td>${d.City}</td>
  <td>${d.State}</td><td>${d.Designation}</td>`;
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

	
