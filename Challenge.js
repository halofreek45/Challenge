var character = document.getElementById("character");
var charXValue = Number(character.getAttribute("x"));
var charYValue = Number(character.getAttribute("y"));
var foodArray = [];
var blueFish = document.getElementById("blueFish");
var redFish = document.getElementById("redFish");
var xCollision;
var yCollision;
var collision;
var totalFishEaten = 0;
var scoreBoard = document.getElementById("score");
var gamePaused = false;

scoreBoard.textContent = "Total Fish Eaten: 0"
foodArray.push(blueFish);
foodArray.push(redFish);
document.addEventListener("keydown", function(e) {
    if (gamePaused == false) {
        if (totalFishEaten == 10) {
            document.getElementById("main-canvas").pauseAnimations();
            gamePaused = true;
            document.getElementById("gameOver").setAttribute("opacity", 1);
        }
        if (e.keyCode == 37) {
            charXValue = charXValue - 10;
            character.setAttribute("x", charXValue);
        } else if (e.keyCode == 39) {
            charXValue = charXValue + 10;
            character.setAttribute("x", charXValue);
        } else if (e.keyCode == 40) {
            charYValue = charYValue + 10;
            character.setAttribute("y", charYValue);
        } else if (e.keyCode == 38) {
            charYValue = charYValue - 10;
            character.setAttribute("y", charYValue);
        }
        scoreBoard.textContent = "Total Fish Eaten: " + totalFishEaten;
    }
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkForCollision() {
  for (var i = 0; i < foodArray.length; i++) {
      var currentFishX = Number(foodArray[i].getAttribute("x"));
      var currentFishXEnd = currentFishX + Number(foodArray[i].getAttribute("width"));
      var currentFishY = Number(foodArray[i].getAttribute("y"));
      var currentFishYEnd = currentFishY + Number(foodArray[i].getAttribute("height"));

      xCollision = false;
      yCollision = false;

      if (Number(character.getAttribute("x")) > currentFishX && Number(character.getAttribute("x")) < currentFishXEnd) {
          xCollision = true;
      }
      if (Number(character.getAttribute("y")) > currentFishY && Number(character.getAttribute("y")) < currentFishYEnd) {
          yCollision = true;
      }
      if (xCollision == true && yCollision == true) {
          foodArray[i].setAttribute("x", getRandomInt(0, 700));
          totalFishEaten++;
      } else {
          xCollision = false;
          yCollision = false;
      }
  }
  requestAnimationFrame(checkForCollision);
}
checkForCollision();
