let numberClassifier;
let canvas;
let resultsDiv;
let inputImage;
let clearButton;

function setup() {
  canvas = createCanvas(400, 400);
  let options = {
    inputs: [28, 28, 4],
    task: 'imageClassification'
  };
  numberClassifier = ml5.neuralNetwork(options);
  const modelDetails = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  };
  background(0);
  clearButton = createButton('clear');
  clearButton.mousePressed(function() {
    background(0);
  });
  resultsDiv = createDiv('loading...');
  inputImage = createGraphics(28, 28);
  numberClassifier.load(modelDetails, modelLoaded);
}

function modelLoaded() {
  classifyImage();
}

function classifyImage() {
  inputImage.copy(canvas, 0, 0, 400, 400, 0, 0, 28, 28);
  
  numberClassifier.classify(
    {
      image: inputImage
    },
    gotResults
  );
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  
  let label = results[0].label;
  let confidence = round(100 * results[0].confidence);
  resultsDiv.html(``);
  if (confidence > 45) {
    resultsDiv.html(`${label} ${confidence}%`);
  }

  classifyImage();
}

function draw() {
  clearButton.position(windowWidth/2 - 25, 620);

  if (mouseIsPressed) {
    strokeWeight(30);
    stroke(255);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }  

}