var character = document.getElementById("character");
var charXValue = Number(character.getAttribute("x"));
var charYValue = Number(character.getAttribute("y"));
var foodArray = [];
var blueFish = document.getElementById("blueFish");
var redFish = document.getElementById("redFish");
var xCollision;
var yCollision;
var collision;
foodArray.push(blueFish);
foodArray.push(redFish);
document.addEventListener("keydown", function(e) {
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

    for (var i = 0; i < foodArray.length; i++) {
        var currentFishX = Number(foodArray[i].getAttribute("x"));
        var currentFishXEnd = currentFishX + Number(foodArray[i].getAttribute("width"));
        var currentFishY = Number(foodArray[i].getAttribute("y"));
        var currentFishYEnd = currentFishY + Number(foodArray[i].getAttribute("height"));

        xCollision = false;
        yCollision = false;

        if (Number(character.getAttribute("x")) > currentFishX && Number(character.getAttribute("x")) < currentFishXEnd) {
            console.log("Collision");
            xCollision = true;
        }
        if (Number(character.getAttribute("y")) > currentFishY && Number(character.getAttribute("y")) < currentFishYEnd) {
            console.log("Collision");
            yCollision = true;
        }
        if (xCollision == true && yCollision == true) {
            foodArray[i].setAttribute("x", getRandomInt(0, 700));
        } else {
            xCollision = false;
            yCollision = false;
        }
    }
    console.log(xCollision);
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
