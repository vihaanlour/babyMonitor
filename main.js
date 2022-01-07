song = "";
objects=[];
status = "";

function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600,400);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "status = detectingObjects";
}

function modelLoaded(){
    console.log("Model is Loaded");
    status = true;
}
function getResults(error,results){
if(error){
    console.log(error);
}
console.log(results);
objects=results;
}
function draw(){
    image(video,0,0,600,400);

    if(status!=""){

    objectDetector.detect(video,getResults);
    for( i=0;i<objects.length;i++){
        r = random(255);
        g = random(255);
        b = random(255);
    noFill();
    stroke(r,g,b);
    percent=floor(objects[i].confidence*100);

    text(objects[i].label +" "+percent+"%",objects[i].x + 5,objects[i].y + 15);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
     
   if(objects[i].label=="person"){
    document.getElementById("status").innerHTML = "Baby Found";
    song.stop();
}
    else{
        document.getElementById("status").innerHTML = "Baby not Found";
        song.play();
    }
    
    if(objects.length==0){
        document.getElementById("status").innerHTML = "Baby not Found";
        song.play();
    }
    }}
}
