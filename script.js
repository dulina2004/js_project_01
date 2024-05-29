var boy = document.getElementById("boy");
var boyIdleImageNumber = 0;
var boyIdleAnimationNumber = 0;
var boyIdleAnimationStatus = false;

function boyIdleAnimation() {
  boyIdleImageNumber = boyIdleImageNumber + 1;
  boy.src = "resourses/Idle (" + boyIdleImageNumber + ").png";
  if (boyIdleImageNumber == 10) {
    boyIdleImageNumber = 0;
  }
}

if (boyIdleAnimationStatus == false) {
  function boyIdleAnimationStart() {
    boyIdleAnimationNumber = setInterval(boyIdleAnimation, 200);
    // alert("ok");
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var jumpSound = new Audio("resourses/Jump.mp3");

var runSound = new Audio("resourses/run.mp3");
runSound.loop = true;

var deadSound = new Audio("resourses/dead.mp3");

function keyCode(event) {
  var keyCode = event.which;

  if (keyCode == 13) {
    // alert("enter");
    //enter

    if (HideBoxStatus == false) {
      hide();
    }

    if (moveBackgroundAnimationId == 0) {
      moveBackgroundAnimationId = setInterval(moveBackground, 25);
    }

    if (boyRunAnimationId == 0) {
      clearInterval(boyIdleAnimationNumber);
      boyRunAnimationId = setInterval(boyRunAnimation, 100);
      runSound.play();
    }

    if (boxAnimationId == 0) {
      boxAnimationId = setInterval(boxAnimation, 25);
    }
  }

  if (keyCode == 32) {
    //space
    if (boyJUmpAnimationId == 0) {
      clearInterval(boyRunAnimationId);
      runSound.pause();
      runSound.currentTime = 0;
      boyRunAnimationId = 0;
      boyRunImageNumber = 1;

      clearInterval(boyIdleAnimationNumber);
      boyJUmpAnimationId = setInterval(boyJumpAnimation, 100);
      jumpSound.play();
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var backgroundImagePositionX = 0;
var moveBackgroundAnimationId = 0;

var score = 0;

function moveBackground() {
  backgroundImagePositionX = backgroundImagePositionX - 5;
  document.getElementById("background").style.backgroundPositionX =
    backgroundImagePositionX + "px";

  score = score + 1;
  document.getElementById("score").innerHTML = score;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var boyRunImageNumber = 1;
var boyRunAnimationId = 0;

function boyRunAnimation() {
  boyRunImageNumber = boyRunImageNumber + 1;

  if (boyRunImageNumber == 9) {
    boyRunImageNumber = 1;
  }

  document.getElementById("boy").src =
    "resourses/Run (" + boyRunImageNumber + ").png";
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var boyJumpImageNumber = 1;
var boyJUmpAnimationId = 0;
var boyMarginTop = 350;

function boyJumpAnimation() {
  boyJumpImageNumber = boyJumpImageNumber + 1;

  if (boyJumpImageNumber <= 7) {
    boyMarginTop = boyMarginTop - 20;
    document.getElementById("boy").style.marginTop = boyMarginTop + "px";
  }

  if (boyJumpImageNumber >= 8) {
    boyMarginTop = boyMarginTop + 20;
    document.getElementById("boy").style.marginTop = boyMarginTop + "px";
  }

  if (boyJumpImageNumber == 13) {
    clearInterval(boyJUmpAnimationId);
    boyJUmpAnimationId = 0;
    jumpSound.pause();
    jumpSound.currentTime = 0;
    boyJumpImageNumber = 1;

    boyRunAnimationId = setInterval(boyRunAnimation, 100);
    runSound.play();

    if (moveBackgroundAnimationId == 0) {
      moveBackgroundAnimationId = setInterval(moveBackground, 100);
    }
    if (boxAnimationId == 0) {
      boxAnimationId = setInterval(boxAnimation, 100);
    }
  }

  document.getElementById("boy").src =
    "resourses/Jump (" + boyJumpImageNumber + ").png";
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var boyDeadImageNumber = 1;
var boyDeadAnimationId = 0;

function boyDeadAniamtion() {
  boyDeadImageNumber = boyDeadImageNumber + 1;

  if (boyDeadImageNumber == 11) {
    clearInterval(boyDeadAnimationId);
    boyDeadImageNumber = 10;
  }

  document.getElementById("boy").src =
    "resourses/Dead (" + boyDeadImageNumber + ").png";
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var boxMarginLeft = 1000;

function createBoxes() {
  // alert("ok");

  for (var i = 0; i < 10; i++) {
    if (i < 5) {
      boxMarginLeft = boxMarginLeft + 1000;
    }

    if (i >= 5) {
      boxMarginLeft = boxMarginLeft + 500;
    }

    var box = document.createElement("div");
    box.className = "box";
    box.id = "box" + i;
    box.style.marginLeft = boxMarginLeft + "px";
    // boxMarginLeft = boxMarginLeft + 500;
    document.getElementById("background").appendChild(box);
  }
}

var boxAnimationId = 0;
function boxAnimation() {
  for (var i = 0; i < 10; i++) {
    var box = document.getElementById("box" + i);
    var currentMarginleft = getComputedStyle(box).marginLeft;
    var newMarginleft = parseInt(currentMarginleft) - 5;
    box.style.marginLeft = newMarginleft + "px";

    // alert(newMarginleft);

    if ((newMarginleft >= 80) & (newMarginleft <= 180)) {
      // alert("done");

      if (boyMarginTop >= 320) {
        clearInterval(boxAnimationId);

        clearInterval(boyRunAnimationId);
        runSound.pause();

        clearInterval(boyJUmpAnimationId);
        jumpSound.pause();

        clearInterval(moveBackgroundAnimationId);

        boyDeadAnimationId = setInterval(boyDeadAniamtion, 100);
        deadSound.play();

        if (showStatus == false) {
          show();
        }
      }
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var HideBoxStatus = false;

function hide() {
  document.getElementById("test").style.display = "none";
  // alert("hidden");
  HideBoxStatus = true;
}

var showStatus = false;

function show() {
  // alert("done");
  document.getElementById("end").style.zIndex = 10;
  showStatus = true;
  var x = document.getElementById("endScore");
  x.innerHTML = "You Score is " + score + "";
}
