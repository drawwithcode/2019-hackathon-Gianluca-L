var tg1_intro;
var analyzer;
var fft;
var volume = 0;

function preload(){
  tg1_intro = loadSound("./assets/TG1_new.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  analyzer = new p5.Amplitude();
  analyzer.setInput(tg1_intro);

  fft = new p5.FFT();
}

function draw() {
  background(0);

  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, width/4);

 // "bass", "lowMid", "mid", "highMid", "treble"

  var spectrum = fft.analyze();

  var trebEnergy = fft.getEnergy("treble");
  var midEnergy = fft.getEnergy("mid");
  var bassEnergy = fft.getEnergy("bass");


  var scaleFactor = volume*0.1;
  fill('red');
  rectMode(CENTER);
  rect(width/2, height/2, scaleFactor*height/40, scaleFactor*height/40);


  rect(width/4, height/2, height/20, 0 + trebEnergy);

  rect(width/2 + 200, height/2, height/20, 0 + midEnergy);

  rect(width/2 + 300, height/2, height/20, 0 + bassEnergy);

}



function mouseClicked() {
  if (tg1_intro.isPlaying() == false) {
      tg1_intro.play();
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
