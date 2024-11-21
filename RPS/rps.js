const choices = ["rock", "paper", "scissors"];

const playerButtons = document.querySelectorAll(".choice");
const resultMessage = document.getElementById("resultMessage");
const computerChoice = document.getElementById("computerChoice");
const resultImage = document.getElementById('resultImage');

let win=document.getElementById('win');
let loss=document.getElementById('loss');
let totalwin=0;
let totalloss=0;
playerButtons.forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.getAttribute("data-choice");
    const computerIndex = Math.floor(Math.random() * choices.length);
    const computerChosen = choices[computerIndex];

    computerChoice.textContent = `Computer chose: ${computerChosen}`;
    const result = determineWinner(playerChoice, computerChosen);

    resultMessage.textContent = result;

    if( computerChosen== choices[0]){
        resultImage.src = 'r.png';
    }
    else if( computerChosen== choices[1]){
        resultImage.src = 'p.png';
    }
    else if( computerChosen== choices[2]){
        resultImage.src = 's.png';
    }

    if(result=="You win!"){
        totalwin = totalwin + 1;
        win.textContent="Wins:"+totalwin
    }
    else if(result=="Computer wins!"){
        totalloss = totalloss + 1;
        loss.textContent="Loss:"+totalloss;
    }




    resultContainer.style.display = 'block';

   
  });
});

function determineWinner(player, computer) {
    if (player === computer) {
      return "It's a tie!";
    } else if ((player === "rock" && computer === "scissors") ||
               (player === "paper" && computer === "rock") ||
               (player === "scissors" && computer === "paper")) {
      return "You win!";
    } else {
      return "Computer wins!";
    }
  }

// For changing backgrounds
const backgrounds = [
    '1.jpg',
    '2.jpg',
    '3.jpg'
];
const restart = document.getElementById('restart');
const body = document.body;

let currentIndex = 0;

restart.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % backgrounds.length;
    const newBackground = backgrounds[currentIndex];
    body.style.backgroundImage = `url(${newBackground})`;
});

// For changing pics

const imageButtons = document.querySelectorAll('.choice');
const imageContainer = document.getElementById('imageContainer');
const image = document.getElementById('image');

imageButtons.forEach(button => {
    button.addEventListener('click', () => {
        const imageSource = button.getAttribute('data-src');
        image.src = imageSource;
        imageContainer.style.display = 'block';
    });
});


function reset(){
    totalwin = 0;
    win.textContent="Wins:"+totalwin
    totalloss = 0;
        loss.textContent="Loss:"+totalloss;

}

function totalresult(){


}