$(document).ready(function() {
    $("#fetchButton").click(function(){
        fetchImages();
    });
})

//=================================================

function fetchImages() {
    var sourceURL = $("#url-form :input[name='url']").val().replace("http://",""),

    win = window.open('http://'+sourceURL, 'analizator');
    
    if (win) {
        //Browser has allowed it to be opened
        win.focus();
    } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
    };


    win.focus();
    $(win).load(function() {
        alert('New Window is Ready');
    });




    //alert(sourceURL);

    $("#fetched").empty();



  //  $.get("http://www.mypage.com", function( my_var ) {
  //      // my_var contains whatever that request returned
  //  });
}



function noscript(strCode){
    var html = $(strCode.bold()); 
    html.find('script').remove();
  return html.html();
 }
 
