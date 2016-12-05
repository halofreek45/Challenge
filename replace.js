function bobIsUpdating() {
  console.log("MyName is BOB");
  requestAnimationFrame(bobIsUpdating);
}
bobIsUpdating();
//This is showing ANDORS how to Updateroniz


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
