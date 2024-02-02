// Paramètres du jeu
var minNumber = 1;
var maxNumber = 100;
var targetNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

// Timer
var timer = document.getElementById("timer");
var temps = 60;
var interval;

// État du jeu
var gameOver = false;

function startTimer() {
  updateTimer();
}

function updateTimer() {
  timer.innerHTML = temps + (temps === 1 ? " seconde" : " secondes");
  if (temps > 0) {
    temps = temps - 1;
    interval = setTimeout(updateTimer, 1000);
  } else {
    timer.innerHTML = "Perdu" + "<br> <img src='perdu.jpg' class='center' alt='Image description'>";
    gameOver = true;
  }
}

// Vérifier la proposition
function checkGuess() {
  if (gameOver) {
    return;
  }

  var input = document.getElementById("guessInput");
  var output = document.getElementById("guessOutput");
  var guessList = document.getElementById("guessList");
  var guess = parseInt(input.value);

  if (isNaN(guess)) {
    alert("Veuillez entrer un nombre valide !");
    return;
  }

  if (guess < minNumber || guess > maxNumber) {
    alert("Le nombre doit être compris entre " + minNumber + " et " + maxNumber + " !");
    return;
  }

  if (!interval) {
    startTimer();
  }

  if (guess === targetNumber) {
    output.innerHTML = "Félicitations, vous avez trouvé le juste prix !" + "<br> <img src='vincentwin.jpg' class='center' alt='Image description'>";
    guessList.innerHTML += "<li>" + guess + " = </li>";
    clearTimeout(interval); // Arrêter le timer lorsque la réponse est correcte
    gameOver = true;
} else if (guess < targetNumber) {
    output.innerHTML = "C'est plus! " + guess + " ! <br> <img src='vincenthaut.png' class='test' alt='Image description'>";
    guessList.innerHTML += "<li>" + guess + " < </li>";
} else {
    output.innerHTML = "C'est moins !" + guess + " ! <br> <img src='vincentbas.jpg' class='test' alt='Image description'>";
    guessList.innerHTML += "<li>" + guess + " > </li>";
}

  input.value = "";
  input.focus();
}
function resetGame() {
  minNumber = 1;
  maxNumber = 100;
  targetNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  temps = 60;
  gameOver = false;
  if (interval) {
    clearTimeout(interval);
    interval = null;
  }
  timer.innerHTML = temps + (temps === 1 ? " seconde" : " secondes");
  var output = document.getElementById("guessOutput");
  var guessList = document.getElementById("guessList");
  output.innerHTML = "";
  guessList.innerHTML = "";
  var input = document.getElementById("guessInput");
  input.value = "";
  input.focus();
}

// Ajoutez cet écouteur d'événements à votre bouton
var resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame);
var input = document.getElementById("guessInput");

// Ajouter un gestionnaire d'événements pour la touche "Entrée"
input.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkGuess();
  }
});
