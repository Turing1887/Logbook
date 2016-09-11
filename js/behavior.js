var fs = require('fs');
const util = require('util');
var openFile;
var entry_note;
var entry_num= 1;
var mtime;
var atime;
var birthtime;
var mtime_str;
var entry_num_str = entry_num.toString();
//var filePath = "logfiles/"+openFile;

$(document).ready(function(){

    $(".add-btn").click(function(){
        $(".main").addClass("hidden");
        $(".file-screen").removeClass("hidden");
    });
    $(".back-btn").click(function(){
        $(".main").removeClass("hidden");
        $(".file-screen").addClass("hidden");
    });


    $("#file-form").submit(function(){
		    createLogFile();

    		$(".open-logname").html($("#filename").val());
            $(".main").removeClass("hidden");
            $(".file-screen").addClass("hidden");
            $(".show-log").attr("readonly","false");
    		return false;
	  });
    $("#log-form").submit(function(event){
        writeEntry();
        return false;
    });

    $("#log-choose").submit(function(){
      getFileInput();
      return false;
    });

    $("#log-input").change(function(){
      getFileInput();
      return false;
    });


    function createLogFile(){
      var today = new Date();
      openFile = $("#filename").val() + ".txt";
    	filePath = "logfiles/"+ openFile;
    	fs.open(filePath,"a+", (err, fd) => {
        // => null, <fd>
        fs.stat(filePath, (err, stats) => {
          ctime = new Date(util.inspect(stats.ctime));
        });
        fs.appendFile(fd,$("#filename").val() + ".log" + "\r\n");
        fs.appendFile(fd,"erstellt am" + "    " + "(" + today + ")" + "\r\n");
        fs.appendFile(fd,"---------------------------------------------------------------------------------------" + "\r\n");
  			fs.close(fd);
		  });
    }

    function writeEntry(){
      var time = new Date();
      entry_note = $("#log-msg").val();

		  fs.open(filePath,"a+", (err, fd) => {
      // => null, <fd>
        fs.stat(filePath, function(err, stats){
          atime = new Date(util.inspect(stats.atime));
          //atime = new Date(util.inspect(stats.atime));
          //console.log(mtime);
        });
        fs.appendFile(fd,entry_num + "#" + "    " + entry_note + "    " + "(" + time + ")" + "\r\n");
        fs.appendFile(fd,"---------------------------------------------------------------------------------------" + "\r\n");
        entry_num++;
  			fs.close(fd);
		  });
      showLogText();
      $("#log-msg").val("");
    }

    function showLogText(){
      fs.open(filePath,"r+", (err, fd) => {
      // => null, <fd>
      fs.readFile(filePath, (err, data) => {
        $(".show-log").val(data);
      });
			fs.close(fd);
		  });
    }

    function getFileInput(){
      var filename = $("#log-input").val().split('\\').pop();
      filePath = "logfiles/" + filename;
      fs.open(filePath,"r+", (err, fd) => {
        // => null, <fd>
        fs.readFile(filePath, (err, data) => {
          $(".show-log").val(data);
        });
			fs.close(fd);
		  });
    }

});
