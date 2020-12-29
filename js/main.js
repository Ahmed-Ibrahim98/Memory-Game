const cards = document.querySelectorAll('.memory-card');
let counter = document.querySelector('.counter')
let stars = document.querySelectorAll('.star')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let composFound = 0;
let moves = 0;

//game timer
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    firstCard.querySelector('.front-face').style.backgroundColor = '#02b3e4'

    return;
  }

  secondCard = this;
  checkForMatch();
  congratulations()
}

function checkForMatch() {
  let isMatch = firstCard.dataset.object === secondCard.dataset.object;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.querySelector('.front-face').style.backgroundColor = '#06e402'
  secondCard.querySelector('.front-face').style.backgroundColor = '#06e402'
  composFound++;
  moveCounter();
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  firstCard.querySelector('.front-face').style.backgroundColor = '#e2043b'
  secondCard.querySelector('.front-face').style.backgroundColor = '#e2043b'
  moveCounter();
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard.querySelector('.front-face').style.backgroundColor = '#222'
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  //start timer on first move
  if(moves == 1){
    second = 0;
    minute = 0; 
    hour = 0;
    startTimer();
  }
  // setting rates based on moves
  if (moves > 8 && moves < 17){
    for( i= 0; i < 3; i++){
        if(i > 1){
            stars[i].style.visibility = "collapse";
        }
    }
  }
  else if (moves > 18){
      for( i= 0; i < 3; i++){
          if(i > 0){
              stars[i].style.visibility = "collapse";
          }
      }
  }
}

function startTimer(){
  interval = setInterval(function(){
      timer.innerHTML = minute+" Mins "+second+" Secs";
      second++;
      if(second == 60){
          minute++;
          second = 0;
      }
      if(minute == 60){
          hour++;
          minute = 0;
      }
  },1000);
}

//modal
let modal = document.getElementById("popup1")
//stars list
 let starsList = document.querySelectorAll(".star");
//close icon in modal
 let closeicon = document.querySelector(".close");
//congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
    if (composFound == 8){
      clearInterval(interval);
      finalTime = timer.innerHTML;
      //show congratulations modal
      modal.classList.add("show");
      //declare star rating variable
      var starRating = document.querySelector(".stars").innerHTML;
      //showing move, rating, time on modal
      document.getElementById("finalMove").innerHTML = moves;
      document.getElementById("starRating").innerHTML = starRating;
      document.getElementById("totalTime").innerHTML = finalTime;
      //closeicon on modal
      closeModal();
    };
}

function startGame() {
  shuffle()
  // remove the flip class from each card and add an event listenner to it
  cards.forEach(card =>{
    card.classList.remove('flip')
    card.addEventListener('click', flipCard)
  })
  // reset moves
  moves = 0;
  // reset the the number of matches found
  composFound = 0;
  counter.innerHTML = moves;
  // reset star rating
  for (var i= 0; i < stars.length; i++){
      stars[i].style.color = "#FFD700";
      stars[i].style.visibility = "visible";
  }
  //reset timer
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}

// shuffling the cards based on their order in the flexbox
function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}

//close icon on modal
function closeModal(){
  closeicon.addEventListener("click", function(e){
      modal.classList.remove("show");
      startGame();
  });
}
//for player to play Again 
function playAgain(){
  modal.classList.remove("show");
  startGame();
}

window.onload = startGame();