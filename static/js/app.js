
// import 'json-sql';



function BuildTable(){

  d3.json("/jobs").then(function(json_data) { 
  
  var tableData = json_data;
  console.log(tableData[1])
  var submit = d3.select('#filter-btn');
  
  //create our function that reacts when user clicks the submit button
  submit.on('click', function(){
  
      //we are preventing refresh and also removing any 
      //previous search results or No results paragraphs
      d3.event.preventDefault();
      d3.selectAll('th').remove()
      d3.selectAll('td').remove()
      d3.selectAll('p').remove()
      
      var inputElement = d3.select('#companyInput');
      
      var inputValue = inputElement.property('value')//.toLowerCase();
      var regex = new RegExp(inputValue,'gi')
      // var a = tableData.indexOf(inputValue)
      // console.log(a)
      console.log(inputValue);
      // console.log(tableData);
      // const regexp = new RegExp(searchStr, 'i');
      // var filteredData = tableData.search(inputValue);
      var filteredData = tableData.filter(job => 
        // job.City.indexOf(inputValue) !== -1)
        regex.test(job.Title||job.Company||job.City||job.State||job.Designation||job.Source)||
        ((job.MaxSalary <= inputValue || job.MaxSalary > inputValue) && job.MaxSalary) 
        ||((job.MinSalary <= inputValue || job.MinSalary > inputValue) && job.MinSalary) 
        || ((job.AvgSalary <= inputValue || job.AvgSalary > inputValue) && job.AvgSalary))
      console.log(filteredData.length)
      
      
      // window.alert(""+filteredData.length+"jobs!")
        // || job.City === inputValue || job.Designation === inputValue
    //  || job.State === inputValue );
      

      // res = JSON.search(tableData,'//Company')
  
      // console.log(filteredData);
      //in this function, data and columns are recognized
      //by d3/js 
      function tabulate(data, columns){
          
          var table = d3.select("#mytable").append('table'),
          thead = table.append('thead'),
          tbody = table.append('tbody');
          
          thead.append('tr')
          .selectAll('th')
          .data(columns)
          .enter()
          .append('th')
          .text(function(column){return column;})
          .attr('align center')
  
  
          var rows = tbody.selectAll("tr")
          .data(data)
          .enter()
          .append("tr");
  
      // create a cell in each row for each column
          var cells = rows.selectAll("td")
          .data(function(row) {
              return columns.map(function(column) {
                  return {column: column, value: row[column]};
              });
          })
          .enter()
          .append("td")
              .text(function(d) { return d.value; })
              .attr('align left');
      
      return table;
  
  
      
  }
      
      //call the tabulate function and pass our filtered data as well as the columns we want
      //if filtered data is an empty list, tell the user no results
      //and print to console no results. other wise, call our
      //tabulate data function with the following columns
      if(inputValue === ""|| filteredData.length ===0){console.log('noresults');
      d3.event.preventDefault();
      var table = d3.select("#mytable").append('table'),
      thead = table.append('thead')
      thead.append('p').text('No Results Try Again !') }
      else{
        d3.event.preventDefault();
        var table = d3.select("#mytable").append('table'),
        thead = table.append('thead')
        thead.append('p').text('There are '+filteredData.length+''+' possible jobs meeting your search.' )
      var data_ = tabulate(filteredData,
      ['Designation','Company','AvgSalary','MinSalary','MaxSalary','City','State','Source','Title']);
      }
  })
  })
  }

  function init() {
    // Grab a reference to the dropdown select element
    //var selector = d3.select("#selDataset");
    // var meta = d3.select("#sample-metadata");
    // meta.html("");
    // Use the list of sample names to populate the select options
    d3.json("/jobs").then(function(json_data) { 
      // console.log(json_data);
      
  
      
  });
  }
  
      // response.forEach((jobItem) => {
      //  Object.entries(jobItem).forEach(([key, value]) => {
      // //   selector
      // //     .append("option")
      // //     .text(title)
      // //     .property("value", title);
      // meta.append("p").text(`${key}: ${value}`);
      // })
      // });
  
  
  
  init();
  BuildTable();