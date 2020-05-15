$(function() {
    console.log('Loading the best poem you will ever see')
    $(".mb-5").after(`<div id='poem'></div>`)
    function loadPoem() {
        $.getJSON( "/api/students/", function (resp){
            console.log(resp.poem)
            $("#poem").html(resp.poem)
        })
    }
    loadPoem()
    setInterval(loadPoem, 7000)
})