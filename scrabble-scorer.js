// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync"); //input was made a const so it cant b changed and we call readline-sync to get input from the user

const oldPointStructure = {  // an object with number arrays assigning value to each letter
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const newPointStructure = {}; //an empty object that stores letter scores from oldPointStructure in lowercase

function transform(oldPointStructure) { //converts oldPointStructure to newPointStructure
  for (const score in oldPointStructure) { //goes through each key(score) in oldPointStructure
    for (const letter of oldPointStructure[score]) { //each letter of oldPointStructure add the total score
      newPointStructure[letter.toLowerCase()] = parseInt(score); //converts letters to lowercase and adds to newPointStructure and makees sure its a number score
    }
  }

  return newPointStructure;
}

function initialPrompt() { //defines initalPrompt which asks user to input a word to score
  return input.question("Let's play some Scrabble!\n\nPlease enter a word to score: "); 
}

const word = initialPrompt();

function oldScrabbleScorer(word) { //converts inputed word to uppercase and initalizes empty string letterpoints to hold score
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) { //loops through letters of given word and give score based on oldPointStructure

    for (const pointValue in oldPointStructure) {

      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      }

    }
  }
  return letterPoints;
}

// Finish writing these functions and variables that we've named //
// Don't change the names or your program won't work as expected.

function simpleScorer(word) { //defines simpleScorer it returns the length of worda as a score
  let score = word.length;
  return score;
}

function vowelBonusScorer(word) { //give 3 points for vowles and 1 for consonants
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  word = word.toLowerCase();
  let score = 0; // Start with a score of 0.

  for (let i = 0; i < word.length; i++) { //loops through word factors in if its a vowel or consonant and returns score
    if (vowels.includes(word[i])) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
}

function scrabbleScorer(word) {
  word = word.toLowerCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];

    if (newPointStructure.hasOwnProperty(letter)) { //hasOwnProperty a method to see if object has spesific property. checks if newPS has score for letter if yes can access score
      score += newPointStructure[letter];
    }
  }
  return score;
}

const scoringAlgorithms = [ //an array of scoring algorithms each witha name, description, and scoring function
  {
    name: "Simple Scorer",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels Scorer",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "New Scrabble Scorer",
    description: "The traditional new scoring algorithm.",
    scorerFunction: scrabbleScorer,
  }
];

function scorerPrompt(word) { //displays all scoring options to the user and has them select one
  console.log("Available Scoring Algorithms:\n");
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`${i}: ${scoringAlgorithms[i].name}`);
  }

  let choice = input.question("Please select a scoring algorithm by entering 0, 1, or 2: ");
  choice = parseInt(choice);

  if (choice >= 0 && choice < scoringAlgorithms.length) {
    const selectedAlgorithm = scoringAlgorithms[choice];
    const score = selectedAlgorithm.scorerFunction(word);
    return {
      name: selectedAlgorithm.name,
      score: score
    };
  } else {
    console.log("Invalid choice. Please select 0, 1, or 2.");
    return null;
  }
}

function runProgram() { //runs the program prints out the results name and score
  const result = scorerPrompt(word);
  if (result) {
    console.log(`Algorithm name: ${result.name}`);
    console.log(`Score for '${word}': ${result.score}`);
  }
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
