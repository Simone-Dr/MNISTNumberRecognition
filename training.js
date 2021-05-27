let zero = [];
let one = [];
let two = [];
let three = [];
let four = [];
let five = [];
let six = [];
let seven = [];
let eight = [];
let nine = [];
function preload() {
	for (let i = 1; i < 3001; i++){
		zero[i] = loadImage(`data/zero (${i}).png`);
		one[i] = loadImage(`data/one (${i}).png`);
		two[i] = loadImage(`data/two (${i}).png`);
		three[i] = loadImage(`data/three (${i}).png`);
		four[i] = loadImage(`data/four (${i}).png`);
		five[i] = loadImage(`data/five (${i}).png`);
		six[i] = loadImage(`data/six (${i}).png`);
		seven[i] = loadImage(`data/seven (${i}).png`);
		eight[i] = loadImage(`data/eight (${i}).png`);
		nine[i] = loadImage(`data/nine (${i}).png`);
	}
}

let numberClassifier;

function setup() {
  createCanvas(400, 400);

  let options = {
    inputs: [28, 28, 4],
    task: 'imageClassification',
    debug: true
  };

  numberClassifier = ml5.neuralNetwork(options);

  for (let i = 1; i < 3001; i++) {
    numberClassifier.addData({ image: zero[i] }, { label: 'zero' });
    numberClassifier.addData({ image: one[i] }, { label: 'one' });
    numberClassifier.addData({ image: two[i] }, { label: 'two' });
    numberClassifier.addData({ image: three[i] }, { label: 'three' });
    numberClassifier.addData({ image: four[i] }, { label: 'four' });
    numberClassifier.addData({ image: five[i] }, { label: 'five' });
    numberClassifier.addData({ image: six[i] }, { label: 'six' });
    numberClassifier.addData({ image: seven[i] }, { label: 'seven' });
    numberClassifier.addData({ image: eight[i] }, { label: 'eight' });
    numberClassifier.addData({ image: nine[i] }, { label: 'nine' });
  }
  numberClassifier.normalizeData();
  numberClassifier.train({ epochs: 50 }, finishedTraining);
}

function finishedTraining() {
  numberClassifier.save();
}