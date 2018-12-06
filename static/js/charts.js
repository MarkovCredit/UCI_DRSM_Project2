   
  // var trace1 = {
  //     x: City.slice(0, 10),
  //     y: Title,
  //     type: "bar"
  //   };
    
  //   // Create the data array for the plot
  //   var data = [trace1];
    
  //   // Define the plot layout
  //   var layout = {
  //     title: "Top 10 Cities for Data Jobs",
  //     xaxis: { title: "City" },
  //     yaxis: { title: "Job Frequency" }
  //   };
    
  //   // Plot the chart to a div tag with id "bar-plot"
  //   Plotly.newPlot("bar-plot", data, layout);
  

// Build a Pie Chart for top 10 designations by number of jobs
function buildPieChart(jobsByState) {

  jobsByState = jobsByState.slice(0,10);

    var trace_pie = {
      type: "pie",
      labels: jobsByState.map(row => row.State),
      values: jobsByState.map(row => row.Jobs_Count),
      hole: .4,
      marker: {
        //colorscale: 'Viridis',
        line: {color: "black", width: 1}
      }
    };
    var data_pie = [trace_pie];

    var layout_pie = {
    title: "States with highest number of jobs",
    margin: {
      t: 40,
      b: -20
      }  
    };

    PIE = document.getElementById("pie");
    Plotly.newPlot(PIE, data_pie, layout_pie);
}

function buildBarChart(jobsByCompany) {
    
  jobsByCompany = jobsByCompany.slice(0,20);

    // Build a Bar Chart for top 10 Companies for data jobs 
    // need to use slice() to grab the top 10 sample_values,

    var trace1 = {
      y: jobsByCompany.map(row => row.Company),
      x: jobsByCompany.map(row => row.Jobs_Count),
      type: "bar",
      orientation: "h"
    };
    
    // Create the data array for the plot
    var data = [trace1];
    
    // Define the plot layout
    var layout = {
      title: "Companies with maximum Data Analytics Jobs postings",
      xaxis: { title: "No. of Jobs"},
      yaxis: { title: "Companies", autorange: "reversed"},
      margin: {
        l: -50
      }
    };
    
    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar-plot", data, layout);
}

function init() {
  
  d3.json("/state").then((data) => {
    buildPieChart(data);
  });

  d3.json("/company").then((data) => {
    buildBarChart(data);
  });
}
init();