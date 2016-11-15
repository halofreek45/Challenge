var character = document.getElementById("character");
var charXValue = Number(character.getAttribute("x"));
var charYValue = Number(character.getAttribute("y"));
document.addEventListener("keydown", function(e){
  if(e.keyCode == 37) {
    charXValue = charXValue - 10;
    character.setAttribute("x", charXValue);
  }
  else if(e.keyCode == 39) {
    charXValue = charXValue + 10;
    character.setAttribute("x", charXValue);
  }
  else if(e.keyCode == 40) {
    charYValue = charYValue + 10;
    character.setAttribute("y", charYValue);
  }
  else if(e.keyCode == 38) {
    charYValue = charYValue - 10;
    character.setAttribute("y", charYValue);
  }
  console.log(e.keyCode + "XVal = " + charXValue + " YVal = " + charYValue);
})
