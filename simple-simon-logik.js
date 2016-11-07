/*** Created by ya boi*/

var $topLeft = $('#triangle-top-left');
var $topRight = $('#triangle-top-right');
var $bottomLeft = $('#triangle-bottom-left');
var $bottomRight = $('#triangle-bottom-right');
var $start = $('#center-square');
var $round = $('#round');
var round = 1;
var haveWeAlreadyStartedListeningForButtonPresses = false;
var positionToCheck = 0;
var playerSequence= [];
var startOnOff = false;
var gameSequence = [];
var keys = {
    q:81,
    w:87,
    a:65,
    s:83
};
//number gets pushed to gameSequence
function randomNumber() {
    gameSequence.push(Math.floor((Math.random() * 4) + 1));
    console.log(gameSequence)
}

function animateOpacity(toBeAnimated) {
    var triangleToAnimate;

    if (typeof toBeAnimated == 'number') {//if the input is a number then it animates based on gameSequence
        if (toBeAnimated == 1){
            triangleToAnimate = $topLeft;
        }else if (toBeAnimated == 2){
            triangleToAnimate = $topRight;
        }else if (toBeAnimated == 4){
            triangleToAnimate = $bottomLeft;
        }else if (toBeAnimated == 3){
            triangleToAnimate = $bottomRight
        }
    } else {                                     //otherwise it animates based on the element input. see:lightUpButtonOnKeypress
        triangleToAnimate = toBeAnimated;
    }
    triangleToAnimate.stop().animate({
            opacity: "1",
            duration: "100000"
        },
        {
            complete: function () {
                triangleToAnimate.animate({opacity: '.3'}, 40)
            }
        });

}

function displaySequence() {
    $.each(gameSequence, function(index, element){
        setTimeout(function() {
            animateOpacity(element);
        }, index * 600);
    });
}

function lightUpButtonOnKeypress() {
    if (haveWeAlreadyStartedListeningForButtonPresses == false) {
        $(document).keyup(function (e) {


            if (e.keyCode === keys.a) {
                animateOpacity($bottomLeft);
                playerSequence.push(4);
                compareSequences();

            } else if (e.keyCode === keys.q) {
                animateOpacity($topLeft);
                playerSequence.push(1);
                compareSequences();

            } else if (e.keyCode === keys.w) {
                animateOpacity($topRight);
                playerSequence.push(2);
                compareSequences();

            } else if (e.keyCode === keys.s) {
                animateOpacity($bottomRight);
                playerSequence.push(3);
                compareSequences(); //once a key is pressed checks arrays against eachother


            }

        });
        haveWeAlreadyStartedListeningForButtonPresses = true;
    }
}

function clearSequences() {
    gameSequence = [];
    round = 1;
}

function playAgain() {
    $('#start').show().text('You Lose.' + 'Play again?');

}

function compareSequences() {

    if (playerSequence[positionToCheck] == gameSequence[positionToCheck]) {
        //correct press
        console.log("Correct");
        positionToCheck++;
    } else {
        //incorrect press
        startOnOff = false;
        clickStart();
        playAgain();
        console.log("incorrect");
    }
    if (positionToCheck == gameSequence.length) {
        console.log("finished");
        round++;
        window.setTimeout(nextLevel, 900);
    }
}

function nextLevel() {

    $round.text('round ' + round);
    playerSequence = [];
    positionToCheck = 0;
    randomNumber();
    displaySequence();
    lightUpButtonOnKeypress();
}

function startGame() {
    clearSequences();
    nextLevel();
}

function clickStart() {
    $start.click(function () {
        if (startOnOff == false)
            startGame();
        $('#start').hide();
        startOnOff = true;
    })
}

clickStart();
