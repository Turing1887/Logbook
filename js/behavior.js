$(document).ready(function(){
    $(".write-log").keydown(function(event){
        if(event.which == 43){
            createLogFile();
        }
    });
    $(".add-btn").click(function(){
        $(".main").addClass("hidden");
        $(".file-screen").removeClass("hidden");
    });
    $(".back-btn").click(function(){
        $(".main").removeClass("hidden");
        $(".file-screen").addClass("hidden");
    });
});

