var userClickedPattern = [];
var gamePattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).on("keypress", function () {
  if (!started) {
    $("h1").text("Level" + " " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  if (started) {
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    // console.log(userClickedPattern);
    // console.log(gamePattern);

    checkAnswer(userClickedPattern.length - 1);
  }
});










function checkAnswer(currentLevel) {

  var truthValue = 0;
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]  ){

    if(userClickedPattern.length === gamePattern.length) {
           setTimeout(nextSequence, 1000);
      }
    }
    else{
      started = false;
      userClickedPattern = [];
      gamePattern = [];
      level = 0;
      $("body").addClass("wrong");
      setTimeout(function(){$("body").removeClass("wrong")}, 200);
      $("h1").text("Game Over! press any key to restart");
      playSound("wrong");
      
    }
    
}

//      ..................... Next sequence  Function ...........

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level" + " " + level);
  var randomeNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomeNumber];
  gamePattern.push(randomChosenColor);
  var select = $("#" + randomChosenColor);
  select.fadeOut(200).fadeIn(100);
  playSound(randomChosenColor);
}

// ...........................audio function................
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//.....................Animate function.......................
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
