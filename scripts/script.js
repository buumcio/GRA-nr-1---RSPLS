var icons = ['rock', 'scissors', 'paper', 'lizard', 'spock'];
var colors = ['#f2c8a5', '#e8425c', '#fbffc7', '#adc80a', '#e1f7d5', '#ffd56f', '#efbbff', '#8aacb8', '#77a978', '#63f6b7', '#add8e6', '#cdf2ee'];

var iconsContainer = document.getElementById('js-iconsContainer');
var mainGame = document.getElementById('js-mainGame');

var allPushBoxes = document.getElementsByClassName('push-box');

for(var i=0; i<allPushBoxes.length; i++) {
	allPushBoxes[i].style.background = colors[Math.floor(Math.random() * colors.length)];
};

mainGame.style.display = 'none';

for(var i=0; i<105; i++) {
	var iconBox = document.createElement('div');
	iconBox.style.background = colors[Math.floor(Math.random() * colors.length)];
	iconBox.classList.add('icon-box');
	iconsContainer.appendChild(iconBox);
	var icon = document.createElement('i');
	icon.classList.add('fas', 'fa-hand-' + icons[Math.floor(Math.random() * icons.length)]);
	iconBox.appendChild(icon);
}

var buttonDisplay = document.getElementById('js-gameNow');

buttonDisplay.addEventListener('click', function(){
	iconsContainer.style.display = 'none';

	if (iconsContainer.style.display == 'none') {
		mainGame.style.display = 'block';

	};
})

var randomIcons = [];
var allIconBoxes = document.getElementsByClassName('icon-box');

setInterval(function(){

	randomIcons.length = 0;

	while(randomIcons.length<10) {
		var randomIcon = allIconBoxes[Math.floor(Math.random() * allIconBoxes.length)];
		if (randomIcons.indexOf(randomIcon) == -1) {
		randomIcons.push(randomIcon);
		}
	};

	for (var i=0; i<randomIcons.length; i++) {
		randomIcons[i].style.background = colors[Math.floor(Math.random() * colors.length)];
		randomIcons[i].firstChild.classList.remove(randomIcons[i].firstChild.className.split(' ')[1]);
		randomIcons[i].firstChild.classList.add('fa-hand-' + icons[Math.floor(Math.random() * icons.length)]);
	}
}, 1000);

var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors'),
    pickLizard = document.getElementById('js-playerPick_lizard'),
    pickSpock = document.getElementById('js-playerPick_spock');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });
pickLizard.addEventListener('click', function() { playerPick('lizard') });
pickSpock.addEventListener('click', function() { playerPick('spock') });

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'flex';
        resultsElem.style.display = 'flex';
        break;
    case 'ended':
        newGameBtn.innerText = 'PLAY AGAIN';
    case 'notStarted':
    default:
        newGameElem.style.display = 'flex';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}
setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {console.log('poiuh')
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints(); 
  }

}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors', 'lizard', 'stock'];
    return possiblePicks[Math.floor(Math.random()*5)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult'),
    noonePoints = document.getElementById('js-noonePoints');

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';
  noonePoints.innerText = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; 
        noonePoints.innerText = "DRAW";
        
        
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'rock' &&  playerPick == 'lizard') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'scissors' && playerPick == 'lizard') ||
        (computerPick == 'paper' &&  playerPick == 'rock') ||
        (computerPick == 'paper' &&  playerPick == 'spock') ||
        (computerPick == 'lizard' && playerPick == 'paper') ||
        (computerPick == 'lizard' && playerPick == 'spock')||
        (computerPick == 'spock' && playerPick == 'rock') ||
        (computerPick == 'spock' && playerPick == 'scissors')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
        setGamePoints();
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
        setGamePoints();
    }

}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;

    if (player.score == 10) {
      alert('The winner is ' + player.name);
      gameState = 'ended';
      setGameElements();
    } else if (computer.score == 10) {
      alert('The winner is computer');
      gameState = 'ended';
      setGameElements();
    }
}