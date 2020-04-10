var upload =  (function() {
    'use strict';
    var fileData = null;

    function loadFile() {
        var file    = audioURL;
        var reader  = new FileReader();

        reader.onloadend = function () {
            fileData = file;
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    function uploadFile() {
        data = new FormData();
        data.append('file', audioURL);

        $.ajax({
          url: "/dump/",
          type: "POST",
          data: data,
          enctype: 'multipart/form-data',
          processData: false,
          contentType: false,
          success: function(data) {
              document.getElementById("result").innerHTML = 'Result: Upload successful';
          },
          error: function(e) {
              document.getElementById("result").innerHTML = 'Result: Error occurred: ' + e.message;
          }
        });
    }
    return {
        fileData: fileData,
        loadFile: loadFile,
        uploadFile: uploadFile
    };

})();