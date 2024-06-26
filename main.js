//Getting the score from the local storage, if not found we will use the default score
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

scoreUpdation(score);


//Adding event listeners to each button
let playerMove = document.querySelectorAll(".moves");
playerMove.forEach((move)=>{
    move.addEventListener("click",(e)=>{
        let userChoice = move.getAttribute("id");
        playGame(userChoice);
    });
})

// Adding event listeners for keyboard event
document.body.addEventListener("keydown", (e)=>{
    let userChoice = e.key;
    if (userChoice === 'r') {
        playGame("rock");
    }else if(userChoice === 'p'){
        playGame("paper");
    }else if(userChoice === 's'){
        playGame("scissors");
    }
});

document.querySelector(".auto-play").addEventListener("click", (e)=>{
    autoPlay();
})

let isAutoPlaying = false;
let intervalId;
// Function to Auto-Play
function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove()
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
        document.querySelector(".auto-play").innerHTML = `Stop Play`;
    }else{
        document.querySelector(".auto-play").innerHTML = `Auto Play`;
        clearInterval(intervalId);
        isAutoPlaying = false;
    }

}
// Function to play the game
function playGame(playerMove){
    let result = '';
    const computerMove = pickComputerMove();

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'Computer Wins!';
        } else if (computerMove === 'paper') {
            result = 'You Win!'
        } else {
            result = 'Tie.';
        }
    } else if (playerMove === 'paper'){
        
        if (computerMove === 'rock') {
            result = 'You Win!';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else {
            result = 'Computer Wins!';
        }
    } else if (playerMove === 'rock'){
        
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'Computer Wins!';
        } else {
            result = 'You Win!';
        }
    }

    if (result === 'You Win!' ) {
        score.wins += 1;
    } else if (result === 'Computer Wins!'){
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    // Storing the score into the local storage
    localStorage.setItem('score', JSON.stringify(score));
    display(playerMove, computerMove, result);
    scoreUpdation(score);
}

// Updating the display after the playGame
function display(playerMove, computerMove, result){
    let resultDisplay = document.querySelector('.result');
    let move = document.querySelector('.move');
    resultDisplay.innerText = `${result}`;
    move.innerHTML = `You picked <img class = "move-icon" src="./images/${playerMove}-emoji.png" alt="">  Computer picked <img class = "move-icon" src="./images/${computerMove}-emoji.png" alt="">`;
}

// Updating score after the playGame
function scoreUpdation(score){
    let scorePanel = document.querySelector('.score-panel');
    scorePanel.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses} and Ties: ${score.ties}.`;
}

// Resetting the Score 
document.querySelector('.reset-score')
    .addEventListener('click', function () {
        showResetConfirmation();
    });

document.body.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace') {
            showResetConfirmation();
        }
});

document.body.addEventListener('keydown', function (e) {
        if (e.key === 'a') {
            autoPlay();
        }
    });

function showResetConfirmation(){
    document.querySelector('.reset-confirmation').innerHTML = `Are you sure you want to reset the score ? 
        <button class="reset-confirmation-btn reset-confirmation-btn-yes ">Yes</button> 
        <button class="reset-confirmation-btn reset-confirmation-btn-no ">No</button>`;

    document.querySelectorAll('.reset-confirmation-btn')
        .forEach((btn)=>{
            btn.addEventListener("click",(e)=>{
                if(e.target.classList.contains('reset-confirmation-btn-yes')){
                    resetScore(score);
                    document.querySelector('.reset-confirmation').innerHTML = ``;
                } else if (e.target.classList.contains('reset-confirmation-btn-no')){
                    document.querySelector('.reset-confirmation').innerHTML = ``;
                }
            })
        });
}


function resetScore(score){
    score.wins = 0; 
    score.losses = 0; 
    score.ties = 0; 
    alert('Score was reset !');
    document.querySelector('.result')
        .innerHTML = ''; 
    document.querySelector('.move')
        .innerHTML = '';
    scoreUpdation(score);
    localStorage.removeItem('score');
}

// Picking the computer's move
function pickComputerMove() {
    let computer;
    let computerMove = '';
    computer = Math.round(Math.random()*2)+1; 
    if (computer === 1) {
        computerMove = 'rock';
    } else if (computer === 2) {
        computerMove = 'paper';
    } else if (computer === 3){
        computerMove = 'scissors';
    }

    return computerMove;
}