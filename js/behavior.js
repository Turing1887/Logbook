var fs = require('fs');
var openFile;
var entry_note;
var entry_num= 1;
var mtime;
var mtime_str;
var entry_num_str = entry_num.toString();

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
    function createLogFile(){
        openFile = $("#filename").val() + ".log";
		//alert(openFile);
		filePath = "logfiles/"+openFile;
		fs.open(filePath,"w", (err, fd) => {
            // => null, <fd>
			//fs.appendFile(fd, "hallo");
			fs.close(fd);
		});
    }

    function writeEntry(){
        entry_note = $("#log-msg").val(); 
        filePath = "logfiles/"+openFile;
		fs.open(filePath,"a+", (err, fd) => {
  // => null, <fd>
            fs.stat("/dir/file.txt", function(err, stats){
                mtime = new Date(util.inspect(stats.mtime));
                //atime = new Date(util.inspect(stats.atime));
                //console.log(mtime);
            });
			fs.appendFile(fd,entry_num + "#" + "    " + entry_note + "(" + mtime + ")" + "\r\n");
            entry_num++;
			fs.close(fd);
		});
    }
    
});

