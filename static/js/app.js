function init() {
  // Grab a reference to the dropdown select element
  //var selector = d3.select("#selDataset");
	var meta = d3.select("#sample-metadata");
	meta.html("");
  // Use the list of sample names to populate the select options
  d3.json("/jobs").then(function(json_data) { 
  	console.log(json_data);
  	// response.forEach((jobItem) => {
   //   Object.entries(jobItem).forEach(([key, value]) => {
   //  //   selector
   //  //     .append("option")
   //  //     .text(title)
   //  //     .property("value", title);
   //  meta.append("p").text(`${key}: ${value}`);
   //  })
   //  });
});
}
init();
