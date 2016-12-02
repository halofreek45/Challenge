var mainCanvas = document.getElementById("main-canvas");
var character = document.getElementById("character");
var charXValue = Number(character.getAttribute("x"));
var charYValue = Number(character.getAttribute("y"));
var foodArray = [];
var blueFish = document.getElementById("blueFish");
var redFish = document.getElementById("redFish");
var xCollision1; // x origin is inbetween the fish x origin and the fish x end
var yCollision1; // y origin is inbetween the fish y origin and the fish y end
var xCollision2; // x end is inbetween the fish x origin and the fish x end
var yCollision2; // y end is inbetween the fish y origin and the fish y end
var collision;
var totalFishEaten = 0;
var scoreBoard = document.getElementById("score");
var gamePaused = false;
var timeStart = Date.now();
var timeStop;
var timeString = "";
var gameOverText;
var sharkEnemy = document.getElementById("shark");
var sharkX;
var sharkXEnd;
var sharkY;
var sharkYEnd;

blueFish.setAttribute("x", getRandomInt(50, window.innerWidth - 50));
redFish.setAttribute("x", getRandomInt(50, window.innerWidth - 50));

scoreBoard.textContent = "Total Fish Eaten: 0"
foodArray.push(blueFish);
foodArray.push(redFish);
document.addEventListener("keydown", function(e) {
    if (gamePaused == false) {
        if (totalFishEaten > 9) {
            endGame();
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
        scoreBoard.textContent = "Total Fish Eaten: " + totalFishEaten + timeString;
    }
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkForFoodCollision() {
    for (var i = 0; i < foodArray.length; i++) {
        var currentFishX = Number(foodArray[i].getAttribute("x"));
        var currentFishXEnd = Number(foodArray[i].getAttribute("x"))+ 80;
        var currentFishY = Number(foodArray[i].getAttribute("y"));
        var currentFishYEnd = Number(foodArray[i].getAttribute("y")) + 160;
        xCollision1 = false;
        yCollision1 = false;
        xCollision2 = false;
        yCollision2 = false;
        if (Number(character.getAttribute("x")) > currentFishX && Number(character.getAttribute("x")) < currentFishXEnd) {
            xCollision1 = true;
        }
        if (Number(character.getAttribute("y")) > currentFishY && Number(character.getAttribute("y")) < currentFishYEnd) {
            yCollision1 = true;
        }
        if (Number(character.getAttribute("x")) + 80 < currentFishXEnd && Number(character.getAttribute("x")) + 80 > currentFishX) {
            xCollision2 = true;
        }
        if (Number(character.getAttribute("y")) + 160 < currentFishYEnd && Number(character.getAttribute("y")) + 160 > currentFishY) {
            yCollision2 = true;
        }
        if (xCollision1 == true && yCollision1 == true) {
            foodArray[i].setAttribute("x", getRandomInt(50, window.innerWidth - 50));
            totalFishEaten++;
        } else if (xCollision2 == true && yCollision2 == true) {
          foodArray[i].setAttribute("x", getRandomInt(50, window.innerWidth - 50));
          totalFishEaten++;
        } else if(xCollision1 == true && yCollision2 == true) {
          foodArray[i].setAttribute("x", getRandomInt(50, window.innerWidth - 50));
          totalFishEaten++;
        }
        else if(xCollision2 == true && yCollision1 == true) {
          foodArray[i].setAttribute("x", getRandomInt(50, window.innerWidth - 50));
          totalFishEaten++;
        }
         else {
            xCollision1 = false;
            yCollision1 = false;
            xCollision2 = false;
            yCollision2 = false;
        }
    }
    window.requestAnimationFrame(checkForFoodCollision);
}
function checkForEnemyCollision() {
  sharkX = Number(sharkEnemy.getAttribute("x"));
  sharkXEnd = Number(sharkEnemy.getAttribute("x"))+ 80;
  sharkY = Number(sharkEnemy.getAttribute("y"));
  sharkYEnd = Number(sharkEnemy.getAttribute("y")) + 160;
  xCollision3 = false;
  yCollision3 = false;
  xCollision4 = false;
  yCollision4 = false;
  if (Number(character.getAttribute("x")) > sharkX && Number(character.getAttribute("x")) < sharkXEnd) {
      xCollision3 = true;
  }
  if (Number(character.getAttribute("y")) > sharkY && Number(character.getAttribute("y")) < sharkYEnd) {
      yCollision3 = true;
  }
  if (Number(character.getAttribute("x")) + 80 < sharkXEnd && Number(character.getAttribute("x")) + 80 > sharkX) {
      xCollision4 = true;
  }
  if (Number(character.getAttribute("y")) + 160 < sharkYEnd && Number(character.getAttribute("y")) + 160 > sharkY) {
      yCollision4 = true;
  }
  if (xCollision3 == true && yCollision3 == true) { console.log("collision with shark")  }
  else if (xCollision4 == true && yCollision4 == true) { console.log("collision with shark")   }
  else if (xCollision3 == true && yCollision4 == true) { console.log("collosion with shark")   }
  else if (xCollision4 == true && yCollision3 == true) { console.log("collision with shark")   }
  else {
      xCollision3 = false;
      yCollision3 = false;
      xCollision4 = false;
      yCollision4 = false;
  }
  window.requestAnimationFrame(checkForEnemyCollision);
}
function moveEnemy() {
  var sharkX = Number(shark.getAttribute("x"));
  var sharkY = Number(shark.getAttribute("y"));
  if(Math.abs(sharkX - charXValue) > Math.abs(sharkY - charYValue)) {
    if(sharkX > charXValue) {
      shark.setAttribute("x", sharkX - 2);
    }
    else {
      shark.setAttribute("x", sharkX + 2);
    }
  }
  else if(sharkX == charXValue && sharkY == charYValue)   {
    console.log("The shark is perfectly aligned")
  }
  else {
    if(sharkY > charYValue) {
      shark.setAttribute("y", sharkY - 2);
    }
    else {
      shark.setAttribute("y", sharkY + 2);
    }
  }
  window.requestAnimationFrame(moveEnemy);
}
function endGame() {
    document.getElementById("main-canvas").pauseAnimations();
    gamePaused = true;
    document.getElementById("gameOver").setAttribute("opacity", 1);
    timeStop = Date.now();
    timeString = "  Time-taken: " + (timeStop - timeStart) / 1000 + " seconds";
    gameOverText = document.getElementById("gameOverText");
    gameOverText.setAttribute("x", window.innerWidth / 2 - 300);
    gameOverText.setAttribute("y", window.innerHeight / 2);
}

checkForEnemyCollision();
moveEnemy();
checkForFoodCollision();

//You should uncomment this and run the code :) It makes a cool cascade
// var array = [];
// for (var i = 0; i < 9999;/*This will spam the console*/ i++) {
// array.push(i);
// console.log(array);
// }
