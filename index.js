//Dictionary of words to use
var listOfWords = ["beekeeper",
"rogue","icy","dryness","attack","tolstoy","does","arc","pyramid","dot","kite","oval","prism","sector","triangle","atlas","roman","green","greek","reddish","star","round","point","plane","line","interval","eclipse","disk","acute","biology","jiffy","igloo","quill","black","mystify","disc","heart","exodus","god","toy","windy","cycle","party","fish","animal","pet","fake","brick","fly","airplane"];

//Alphabet & letters
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var letters = document.querySelector(".letters");
var letter = document.querySelector(".letter");
let usedLetters = [];
let displayUsedLetters = document.querySelector(".usedLetters");

//Word
var secretWord = document.querySelector(".secretWord");
let randomWord;
let wordLength;

//Progress
let correctGuesses;
let incorrectGuesses;
var gameFinish = document.querySelector(".gameFinish");

//Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function getRandomWord(){ 
  var randomIndex = Math.floor(Math.random() * listOfWords.length);
  randomWord = listOfWords[randomIndex];
  hideWord(randomWord);
}

function startGame(){
  //Reset variables 
  correctGuesses = 0;
  incorrectGuesses = 0;
  usedLetters = [];
  wordLength = 0;
  
  //Reset HTML Content
  gameFinish.style.display = "none";
  secretWord.innerHTML = " ";
  letters.innerHTML = " ";
  displayUsedLetters.innerHTML = " ";
  
  //Reset canvas
  ctx.fillStyle = "#03011f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  //Create letter divs with alphabet
  for (var i = 0; i<alphabet.length;i++){
  let letterDiv = document.createElement("div");
  letterDiv.className = "letter";
  letterDiv.innerHTML = alphabet[i];
  letters.append(letterDiv);
}
  getRandomWord();
}

function hideWord(randomWord){
  //Replace each letter of word with '_'
  for (var i = 0; i<randomWord.length;i++){
    let char = document.createElement("span");
    char.className = "char";
    
    //Do not count a space as a letter
    if (randomWord[i] === " "){
      char.innerHTML = " ";
    } else {
      char.innerHTML = "_";
      wordLength++;
    }
    secretWord.append(char);
  }
}

function checkChar(char){
  
  //if letter has already been used do nothing, otherwise..
  if(usedLetters.includes(char)){
    console.log("You already used this letter");
  } else {
    
    //add used letter to list
    var usedLetter = document.createElement("div");
    usedLetter.className = "usedLetter";
    usedLetter.innerHTML = char;
    usedLetters.push(char);
    displayUsedLetters.append(usedLetter);
    
    //if used letter is not in the hidden word, guess again and draw hangman
    if(!randomWord.includes(char)){
      incorrectGuesses++;
      drawHangman(incorrectGuesses);
      
      //check win/lose progress
      checkWin();
    } else {
      for (var i = 0; i < randomWord.length; i++){
      
      //if used letter is in the word
      if (randomWord[i] === char){
        correctGuesses++;
      
        //check win/lose progress and reveal correctly found letters
        checkWin();
        let toChange = $("span")[i];
        toChange.innerHTML = randomWord[i];
    } 
   };
  }
 }
};

function checkWin(){
  var finishText = document.querySelector(".finishText");
  if (correctGuesses === wordLength){
    finishText.innerHTML = "Congratulations! You Won! Have another go..";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    gameFinish.style.display = "block";
  } 
  if (incorrectGuesses === 9){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    finishText.innerHTML = "Game Over! Unlucky! Try again..";
    gameFinish.style.display = "block";
  }
}

function drawHangman(incorrectGuesses){
  switch (incorrectGuesses){
    case 1:
      //Bottom
      ctx.beginPath();
      ctx.moveTo(250, 300);
      ctx.lineTo(350, 300);
      break;
    case 2:
      //Vertical
      ctx.moveTo(300,300);
      ctx.lineTo(300, 50);
      break;
    case 3:
      //Top
      ctx.moveTo(300,50);
      ctx.lineTo(450, 50);
      break;
    case 4:
      //Rope
      ctx.moveTo(450, 50);
      ctx.lineTo(450, 100);
      break;
    case 5:
      //Head
      ctx.beginPath();
      ctx.arc(450,100+15,15,0,2*Math.PI);
      break;
    case 6:
      //Body
      ctx.beginPath();
      ctx.moveTo(450,100+30);
      ctx.lineTo(450, 200);
      break;
    case 7:
      //Leg 1
      ctx.lineTo(430, 230);
      break;
    case 8:
      //Leg 2
      ctx.moveTo(450, 200);
      ctx.lineTo(470,230);
      break;
    case 9:
      //Arms
      ctx.moveTo(430, 160);
      ctx.lineTo(470, 160);
      break;
    default:
  }
  ctx.strokeStyle = "#6cacc5";
  ctx.stroke();
}

$(letters).on('click', function(e){
  if(alphabet.includes(e.target.innerHTML)){
    checkChar(e.target.innerHTML);
  }
});

startGame();
