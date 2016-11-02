/**
 * Created by Matt on 11/1/16.
 */
$('document').ready(function () {});
var $topLeft = $('#triangle-top-left');
var $topRight = $('#triangle-top-right');
var $bottomLeft = $('#triangle-bottom-left');
var $bottomRight = $('#triangle-bottom-right');
var $start = $('#center-square');
var $round = $('#round');
var round = 1;
var whichTriangle = [$topLeft, $topRight, $bottomLeft, $bottomRight];
var playerSequence= [];
var gameSequence = [1, 3, 2, 4];
var randomColor;
var keys = {
    q:81,
    w:87,
    a:65,
    s:83
};


function nextLevel() {
    $round.text('round ' + round );
    randomNumber();
    displaySequence();
    lightUpButtonOnKeypress();
}

function displaySequence() {
    $.each(gameSequence, function(index, element){
    animateOpacity(element);

    });
}

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
        }else if (toBeAnimated == 3){
            triangleToAnimate = $bottomLeft;
        }else if (toBeAnimated == 4){
            triangleToAnimate = $bottomRight
        }
    }else {
        triangleToAnimate = toBeAnimated;
    }
    triangleToAnimate.animate({
            opacity: "1"
        },
        {
            duration: '100',
            complete: function () {
                triangleToAnimate.animate({opacity: '.5'}, 300)
            }
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
    })
}



function startGame() {

    nextLevel();

    }


$start.click(function (){
    startGame();
    $('#start').hide();
});

