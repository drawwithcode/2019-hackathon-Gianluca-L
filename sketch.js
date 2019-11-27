var tg1_intro;
var analyzer;
var fft;
var volume = 0;
var img;

function preload() {
  tg1_intro = loadSound("./assets/TG1_new.mp3");
  img = loadImage("./assets/logo.png");
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
  volume = map(volume, 0, 1, 0, 255);
  tint(0, 0, 255, volume * 3);
  //backgroundImage(img);
  imageMode(CENTER);
  image(img, width / 2, height / 2, img.width / 6000000 * (width * height), img.height / 6000000 * (width * height))


  var spectrum = fft.analyze();


  fill('blue');
  push();
  rectMode(CENTER);


  for (var i = 0; i < spectrum.length; i++) {
    var x = map(i, 0, spectrum.length, 0, 1.5 * width / 2);
    var h = -height / 4 + map(spectrum[i], 0, height / 4.235, height, 0);
    rect(width / 2 + x, height, width / spectrum.length, h)
    rect(width / 2 - x, height, width / spectrum.length, h)

    var x2 = map(i, 0, spectrum.length, 0, 1.5 * width / 2);
    var h2 = 2 * height + map(spectrum[i], 0, height / 4.235, height, 0);

    rect(width / 2 + x2, -height * 1.05, width / spectrum.length, h2)
    rect(width / 2 - x2, -height * 1.05, width / spectrum.length, h2)
  }
  pop();

}


function mouseClicked() {
  if (tg1_intro.isPlaying() == false) {
    tg1_intro.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function backgroundImage(img) {
  push();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  let scale = Math.max(width / img.width, height / img.height);
  image(img, 0, 0, img.width / 5 * scale, img.height / 5 * scale)
  pop();
}
