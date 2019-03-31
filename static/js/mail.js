var mail = d3.select('#mailbutton');
  
  //create our function that reacts when user clicks the submit button
  mail.on('click', function(){
                       function mail_content()    
                       {    
                         var tableContent = document.getElementById("mytable").innerHTML;    
                         $.post('mail.php',{content:tablecontent},function(data) {
                      });
                       }
                    })
        