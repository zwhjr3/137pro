status = "";
video = "";
objects = [];
function setup() {
    canvas = createCanvas(400, 300);
canvas.center();
video = createCapture(VIDEO);
video.size(400,300);
video.hide();
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "objects are detecting";
ininput = document.getElementById("inputer").value;
}

function modelLoaded() {
    console.log("model loading");
    status = true;
}
function Result(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects = results;
  }
  
function draw() {
    image(video, 0, 0, 400, 300);
    if(status != "")
        {
          objectDetector.detect(video, Result);
          for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "objects are detected";
            
            fill("#00FF00");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + percent + "%", objects[i].x + 20, objects[i].y + 20);
            noFill();
            stroke("#00FF00");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
  
           
            if(objects[i].label == inputer)
            {
              video.stop();
              objectDetector.detect(Result);
              document.getElementById("status").innerHTML = inputer + "found";
              synth = window.speechSynthesis;
              utterThis = new SpeechSynthesisUtterance(inputer + "found");
              synth.speak(utterThis);
            }
            else
            {
              document.getElementById("status").innerHTML = inputer + "nope";
            }          
           }
        }
  }
