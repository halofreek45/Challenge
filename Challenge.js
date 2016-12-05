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
var winGameText;
var gameOverText;
var livesText = document.getElementById("livesText");
var sharkEnemy = document.getElementById("shark");
var lives = 10;
var won;
var enemyArray = [];

enemyArray.push(sharkEnemy)
for (var i = 0; i < 3; i++) {
  var clone = sharkEnemy.cloneNode(true);
  clone.setAttribute("id", "clone" + i);
  clone.setAttribute("x", getRandomInt(50, window.innerWidth - 50));
  clone.setAttribute("y", getRandomInt(50, window.innerHeight - 50));
  enemyArray.push(clone);
  mainCanvas.appendChild(clone);
}

blueFish.setAttribute("x", getRandomInt(50, window.innerWidth - 50));
redFish.setAttribute("x", getRandomInt(50, window.innerWidth - 50));

livesText.textContent = "Lives Left: " + lives.toFixed(0);
scoreBoard.textContent = "Total Fish Eaten: 0"
foodArray.push(blueFish);
foodArray.push(redFish);
document.addEventListener("keydown", function(e) {
    if (gamePaused == false) {
        if (totalFishEaten > 9) {
            won = true;
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
        var currentFishXEnd = Number(foodArray[i].getAttribute("x")) + 80;
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
        } else if (xCollision1 == true && yCollision2 == true) {
            foodArray[i].setAttribute("x", getRandomInt(50, window.innerWidth - 50));
            totalFishEaten++;
        } else if (xCollision2 == true && yCollision1 == true) {
            foodArray[i].setAttribute("x", getRandomInt(50, window.innerWidth - 50));
            totalFishEaten++;
        } else {
            xCollision1 = false;
            yCollision1 = false;
            xCollision2 = false;
            yCollision2 = false;
        }
    }
    window.requestAnimationFrame(checkForFoodCollision);
}

function checkForEnemyCollision() {
    if(lives < 0) {
      won = false;
      endGame();
    }
    for(var i = 0; i < enemyArray.length; i++) {
      var sharkX;
      var sharkXEnd;
      var sharkY;
      var sharkYEnd;
      var collision3;
      var collision4;

      sharkX = Number(enemyArray[i].getAttribute("x"));
      sharkXEnd = Number(enemyArray[i].getAttribute("x")) + 80;
      sharkY = Number(enemyArray[i].getAttribute("y"));
      sharkYEnd = Number(enemyArray[i].getAttribute("y")) + 160;
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
      if (xCollision3 == true && yCollision3 == true) {
        lives = lives - .01; livesText.textContent = "Lives Left: " + lives.toFixed(0);
      } else if (xCollision4 == true && yCollision4 == true) {
        lives = lives - .01; livesText.textContent = "Lives Left: " + lives.toFixed(0);
      } else if (xCollision3 == true && yCollision4 == true) {
        lives = lives - .01; livesText.textContent = "Lives Left: " + lives.toFixed(0);
      } else if (xCollision4 == true && yCollision3 == true) {
        lives = lives - .01; livesText.textContent = "Lives Left: " + lives.toFixed(0);
      } else {
        xCollision3 = false;
        yCollision3 = false;
        xCollision4 = false;
        yCollision4 = false;
      }
    }
    window.requestAnimationFrame(checkForEnemyCollision);
}

function moveEnemy() {
  for(var i = 0; i < enemyArray.length; i++) {
    var sharkX = Number(enemyArray[i].getAttribute("x"));
    var sharkY = Number(enemyArray[i].getAttribute("y"));
    if (Math.abs(sharkX - charXValue) > Math.abs(sharkY - charYValue)) {
      if (sharkX > charXValue) {
        enemyArray[i].setAttribute("x", sharkX - 2);
      } else {
        enemyArray[i].setAttribute("x", sharkX + 2);
      }
    } else if (sharkX == charXValue && sharkY == charYValue) {
      lives = lives - .05;
      livesText.textContent = "Lives Left: " + lives.toFixed(0);
    } else {
      if (sharkY > charYValue) {
        enemyArray[i].setAttribute("y", sharkY - 2);
      } else {
        enemyArray[i].setAttribute("y", sharkY + 2);
      }
    }
  }
    window.requestAnimationFrame(moveEnemy);
}

function endGame() {
  if(won == false) {
    document.getElementById("main-canvas").pauseAnimations();
    gamePaused = true;
    document.getElementById("gameOver").setAttribute("opacity", 1);
    timeStop = Date.now();
    timeString = "  Time-taken: " + (timeStop - timeStart) / 1000 + " seconds";
    gameOverText = document.getElementById("gameOverText");
    gameOverText.setAttribute("x", window.innerWidth / 2 - 300);
    gameOverText.setAttribute("y", window.innerHeight / 2);
  }
  else {
    document.getElementById("main-canvas").pauseAnimations();
    gamePaused = true;
    document.getElementById("gameOver").setAttribute("opacity", 1);
    timeStop = Date.now();
    timeString = "  Time-taken: " + (timeStop - timeStart) / 1000 + " seconds";
    winGameText = document.getElementById("winText");
    winGameText.setAttribute("x", window.innerWidth / 2 - 300);
    winGameText.setAttribute("y", window.innerHeight / 2);
  }
  for(var i = 0; i < enemyArray.length; i++) {
    enemyArray[i].setAttribute("x", 1000000000000);
  }
}
// function moveEnemy2() {
//     var cloneX = Number(clone.getAttribute("x"));
//     var cloneY = Number(clone.getAttribute("y"));
//     if (Math.abs(cloneX - charXValue) > Math.abs(cloneY - charYValue)) {
//         if (cloneX > charXValue) {
//             clone.setAttribute("x", cloneX - 2);
//         } else {
//             clone.setAttribute("x", cloneX + 2);
//         }
//     } else if (cloneX == charXValue && cloneY == charYValue) {
//         lives = lives - .05;
//         livesText.textContent = "Lives Left: " + lives.toFixed(0);
//     } else {
//         if (cloneY > charYValue) {
//             clone.setAttribute("y", cloneY - 2);
//         } else {
//             clone.setAttribute("y", cloneY + 2);
//         }
//     }
//     window.requestAnimationFrame(moveEnemy2);
// }


checkForEnemyCollision();
moveEnemy();
checkForFoodCollision();
//moveEnemy2();

//You should uncomment this and run the code :) It makes a cool cascade
// var array = [];
// for (var i = 0; i < 9999;/*This will spam the console*/ i++) {
// array.push(i);
// console.log(array);
// }
console.log(enemyArray);
