const score = JSON.parse(localStorage.getItem('score'));

updateScoreElement();

function game(user){
  let comp = compchoice();
  let result = evaluate(user, comp);
  document.querySelector('.js-result')
    .innerHTML = `You ${result}.`;
  const userEmoji = getEmoji(user);
  const compEmoji = getEmoji(comp);
  document.querySelector('.js-move')
    .innerHTML = `You ${userEmoji} - ${compEmoji} Computer.`;
};


function compchoice(){
  let computer = '';
  const comp = Math.random();
  if (comp < 0.34) {
    computer = 'Rock';     
  } else if (comp <= 0.67) {
    computer = 'Paper';
  } else {
    computer = 'Scissors';
  }
  return computer;
};

function evaluate(user, comp){
  let result;
  if (user === 'Rock'){
    comp === 'Rock'? (result = 'Tie', score.Tie += 1)
    :comp === 'Paper'? (result = 'Lose', score.Lose += 1)
    :(result = 'win', score.Win += 1); 
  }else if (user === 'Paper'){
    comp === 'Rock'? (result = 'Win', score.Win += 1)
    :comp === 'Paper'? (result = 'Tie', score.Tie += 1)
    :(result = 'Lose', score.Lose += 1);
  }else{
    comp === 'Rock'? (result = 'Lose', score.Lose += 1)
    :comp === 'Paper'? (result = 'Win', score.Win +=1)
    :(result = 'Tie', score.Tie += 1);
  }
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
  return result;
};


function reset(){
  score.Win = 0;
  score.Lose = 0;
  score.Tie = 0;
  localStorage.setItem('score', JSON.stringify(score));
  document.querySelector('.js-move')
    .innerHTML = `You  - Computer.`;
};

function updateScoreElement(){
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.Win}, Ties: ${score.Tie}, Losses: ${score.Lose}`;
};

function getEmoji(move) {
  switch (move) {
    case 'Rock':
      return `<img src="Img/rock-emoji.png" class="move">`; 
    case 'Paper':
      return `<img src="Img/paper-emoji.png" class="move">`;
    case 'Scissors':
      return `<img src="Img/scissors-emoji.png" class="move">`;
    default:
      return '';
  }
}

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  
  if (!isAutoPlaying){
    intervalId = setInterval(function(){
        game(compchoice());
      }, 1000);
    isAutoPlaying = true;
    document.querySelector('.autoPlay-button').textContent = 'Stop Playing';
  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.autoPlay-button').textContent = 'Auto Play';
  }
  
}