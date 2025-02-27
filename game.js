var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "yellow", "green", "blue"];
var level=0;
var started=false;

$(document).keydown(function(){
    if (!started){
        $("#level-title").text("Level"+ level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function () {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor((Math.random() * 3) + 1);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);

}

function animatePress(currentColor){
    
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")},100
    );
    
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        
      if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){nextSequence()},1000);
      }}
    else{
        var wrongAnswerAudio= new Audio("sounds/wrong.mp3");
        wrongAnswerAudio.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        startOver();
    }
}

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}