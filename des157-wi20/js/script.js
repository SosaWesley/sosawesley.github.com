function setup(){
  var myCanvas = createCanvas(800, 250);
  background(0);

  myCanvas.parent(mySketch);
}


function draw(){
  textSize(18);
  fill('#FFFFFF');
  textAlign(CENTER);
  text("Click and drag to draw.", 400, 130);
  
  if(mouseIsPressed){
    stroke('#FFFFFF');
    line(pmouseX, pmouseY, mouseX, mouseY);
    
    fill('#FFFFFF');
    ellipse(pmouseX, pmouseY, 5, 5);
  }
}