/*** Created by ya boi*/
$('document').ready(function () {});
var $topLeft = $('#triangle-top-left');
var $topRight = $('#triangle-top-right');
var $bottomLeft = $('#triangle-bottom-left');
var $bottomRight = $('#triangle-bottom-right');
var $start = $('#center-square');
var $round = $('#round');
var round = 1;
var playerSequence= [];
var gameSequence = [];
var keys = {
    q:81,
    w:87,
    a:65,
    s:83
};

function randomNumber() {
    gameSequence.push(Math.floor((Math.random() * 4) + 1));
    console.log(gameSequence)
}

function animateOpacity(toBeAnimated) {
    var triangleToAnimate;
    if (typeof toBeAnimated == 'number'){
        if (toBeAnimated == 1){
            triangleToAnimate = $topLeft;
        }else if (toBeAnimated == 2){
            triangleToAnimate = $topRight;
        }else if (toBeAnimated == 4){
            triangleToAnimate = $bottomLeft;
        }else if (toBeAnimated == 3){
            triangleToAnimate = $bottomRight
        }
    }else {
        triangleToAnimate = toBeAnimated;
    }
    triangleToAnimate.stop().animate({
            opacity: "1"
        },
        {
            duration: '50',
            complete: function () {
                triangleToAnimate.stop().animate({opacity: '.5'}, 300)
            }
        });

}

function displaySequence() {
    $.each(gameSequence, function(index, element){
        setTimeout(function() {
            animateOpacity(element);
        }, index * 350);
    });
}

function lightUpButtonOnKeypress() {
    $(document).keyup(function (e) {


        if (e.keyCode === keys.a) {
            animateOpacity($bottomLeft);
            playerSequence.push(4);


            console.log(playerSequence);
        } else if (e.keyCode === keys.q) {
            animateOpacity($topLeft);
            playerSequence.push(1);


            console.log(playerSequence);
        } else if (e.keyCode === keys.w) {
            animateOpacity($topRight);
            playerSequence.push(2);


            console.log(playerSequence);
        } else if (e.keyCode === keys.s) {
            animateOpacity($bottomRight);
            playerSequence.push(3);


            console.log(playerSequence);
        }
        compareSequences();

    });
}

function compareSequences() {
    var is_same = (playerSequence.length == gameSequence.length) && playerSequence.every(function(element, index) {
            return element === gameSequence[index];
        });
    if (is_same) {
        ++round;
        playerSequence = [];
        nextLevel();
    }else if(!is_same){
        alert('you suck')
    }
}

function nextLevel() {

    $round.text('round ' + round);
    randomNumber();
    displaySequence();
    lightUpButtonOnKeypress();
}




function startGame() {
    nextLevel();



}

$start.click(function (){
    startGame();
    $('#start').hide();
});
