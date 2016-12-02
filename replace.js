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
    if (xCollision3 == true && yCollision3 == true) {   }
    else if (xCollision4 == true && yCollision4 == true) {    }
    else if(xCollision3 == true && yCollision4 == true) {    }
    else if(xCollision4 == true && yCollision3 == true) {    }
    else {
        xCollision3 = false;
        yCollision3 = false;
        xCollision4 = false;
        yCollision4 = false;
    }
