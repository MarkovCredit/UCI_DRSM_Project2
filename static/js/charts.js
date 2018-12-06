function buildchartdata {
    d3.json(`/jobs`).then((data) => {
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#plot");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(data).forEach(([key, value]) => {
        PANEL.append("plot").text(`${key}: ${value}`);
      });
    
    // Build a Pie Chart for top 10 jobs by deignation
    // need to use slice() to grab the top 10 sample_values,
    
    var pieData = [
        {
          values: Designation.slice(0, 10),
          labels: Designation.slice(0, 10),
          hovertext: Designation.slice(0, 10),
          hoverinfo: "hovertext",
          type: "pie"
        }
      ];
  
      var pieLayout = {
        margin: { t: 0, l: 0 }
      };
  
      Plotly.plot("pie", pieData, pieLayout);
    });
  }
  
  // Build a Bar Chart for top 10 cities for data jobs 
  // need to use slice() to grab the top 10 sample_values,
  // Create the Trace
var trace1 = {
    x: City.slice(0, 10),
    y: Title,
    type: "bar"
  };
  
  // Create the data array for the plot
  var data = [trace1];
  
  // Define the plot layout
  var layout = {
    title: "Top 10 Cities for Data Jobs",
    xaxis: { title: "City" },
    yaxis: { title: "Job Frequency" }
  };
  
  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar-plot", data, layout);
  
  // Build a Bar Chart for top 10 Companies for data jobs 
  // need to use slice() to grab the top 10 sample_values,

  var trace1 = {
    x: Company.slice(0, 10),
    y: Title,
    type: "bar"
  };
  
  // Create the data array for the plot
  var data = [trace1];
  
  // Define the plot layout
  var layout = {
    title: "Top 10 Company for Data Jobs",
    xaxis: { title: "City" },
    yaxis: { title: "Job Frequency" }
  };
  
  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar-plot", data, layout);