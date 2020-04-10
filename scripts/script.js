const record = document.querySelector('.record');
const stop = document.querySelector('.stop');
const soundClips = document.querySelector('.sound-clips');

var fileData = null;

function uploadFile() {
    data = new FormData();
    data.append('file', fileData);

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

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
    navigator.mediaDevices.getUserMedia(
        // constraints - only audio needed for this app
        {
            audio: true
        })

        // Success callback
        .then(function (stream) {
            const mediaRecorder = new MediaRecorder(stream);

            record.onclick = function () {
                mediaRecorder.start();
                console.log(mediaRecorder.state);
                console.log("recorder started");
                record.style.background = "red";
                record.style.color = "black";
            }

            let chunks = [];

            mediaRecorder.ondataavailable = function (e) {
                chunks.push(e.data);
            }

            stop.onclick = function () {
                mediaRecorder.stop();
                console.log(mediaRecorder.state);
                console.log("recorder stopped");
                record.style.background = "";
                record.style.color = "";
            }

            mediaRecorder.onstop = function (e) {
                console.log("recorder stopped");

                const clipName = prompt('Enter a name for your sound clip');

                const clipContainer = document.createElement('article');
                const clipLabel = document.createElement('p');
                const audio = document.createElement('audio');
                const deleteButton = document.createElement('button');

                clipContainer.classList.add('clip');
                audio.setAttribute('controls', '');
                deleteButton.innerHTML = "Delete";
                clipLabel.innerHTML = clipName;

                clipContainer.appendChild(audio);
                clipContainer.appendChild(clipLabel);
                clipContainer.appendChild(deleteButton);
                soundClips.appendChild(clipContainer);

                const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
                chunks = [];
                const audioURL = window.URL.createObjectURL(blob);
                audio.src = audioURL;
                console.log(audioURL);

                var file    = blob;
                var reader  = new FileReader();
            
                reader.onloadend = function () {
                    fileData = file;
                }
                if (file) {
                    reader.readAsDataURL(file);
                }
                uploadFile();

                
                deleteButton.onclick = function (e) {
                    let evtTgt = e.target;
                    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
                }
            }
        })


        // Error callback
        .catch(function (err) {
            console.log('The following getUserMedia error occured: ' + err);
        }
        );
} else {
    console.log('getUserMedia not supported on your browser!');
}