function init() {

  // Use the list of sample names to populate the select options
  d3.json("/jobs").then(function(json_data) { 
  	console.log(json_data.length);

});
}
init();
