// alert("Hare Krsna");
gamePattern=[];
userClickedPattern=[];
level=0;
cnt=0;

function nextSequence(){
    var randomNumber=Math.ceil((Math.random()*10))%4;
    // alert(randomNumber);
    level++;
    console.log(randomNumber);
    // alert(randomNumber);
    return randomNumber;
}

buttonColours=["red", "blue", "green", "yellow"];

var idx=nextSequence();
// gamePattern.push(buttonColours[idx-1]);

// $("#"+buttonColours[idx]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

// function play() {
//     var audio = new Audio('./sounds/'+buttonColours[idx]+'.mp3');
//     // alert("haribol!!");
//     audio.play();
//   }

//   play();

  $("#"+buttonColours[idx]).click(function() {
    // alert( "Handler for .click() called." );
    playSound(buttonColours[idx]);
  });

  // step 4 ::

  var userChosenColour;

$('div[type="button"]').click(function(e){
    userChosenColour = e.target.id;
    // alert(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    cnt++;
    // alert(cnt);
    if(cnt==level-1 || gamePattern[userClickedPattern.length-1]!=userClickedPattern[userClickedPattern.length-1]){
        // check();
        // alert(gamePattern);
        if(gamePattern[userClickedPattern.length-1]!=userClickedPattern[userClickedPattern.length-1]){
            check();
        }
        else{
            setTimeout(function(){
                // restart();
                check();
            }, 1000);
        }
    }
  });

  // step 5 :
  function playSound(name){
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
  }

  // step 6 :
  function animatePress(currentColour){
      $('#'+currentColour).addClass("pressed");
      setTimeout(function() {
        $('#'+currentColour).removeClass('pressed');
    }, 90);
  }

  // step 7 :
  function restart(){
    $( document ).one("keypress",function() {
        $('#level-title').text("Level "+level);
        // alert(level);

        var idx=nextSequence();
        gamePattern.push(buttonColours[idx]);
        $("#"+buttonColours[idx]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(buttonColours[idx]);

        cnt=0;
        userClickedPattern=[];
      });    
  }

restart();

  // step 8+9 :
function check(){
    if(JSON.stringify(gamePattern)!=JSON.stringify(userClickedPattern)){
        console.log(gamePattern);
        console.log(userClickedPattern);
        $('#level-title').text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $(document.body).addClass("game-over");
        setTimeout(function() {
            $(document.body).removeClass('game-over');
        }, 200);
        level=1;
        gamePattern=[];
        // alert(gamePattern);
        // setTimeout(function(){
        //     restart();
        // }, 1000);
        restart();
    }
    else{
        $('#level-title').text("Level "+level);
        // alert(level);
        var idx=nextSequence();
        gamePattern.push(buttonColours[idx]);
        $("#"+buttonColours[idx]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(buttonColours[idx]);
        cnt=0;
        userClickedPattern=[];
    }
}


