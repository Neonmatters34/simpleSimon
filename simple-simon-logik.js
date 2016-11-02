/**
 * Created by Matt on 11/1/16.
 */
$('document').ready(function () {});
var $topLeft = $('#triangle-top-left');
var $topRight = $('#triangle-top-right');
var $bottomLeft = $('#triangle-bottom-left');
var $bottomRight = $('#triangle-bottom-right');
var $start = $('#center-square');
var whichTriangle = [$topLeft, $topRight, $bottomLeft, $bottomRight];
var playerSequence= [];
var gameSequence = [];
var randomColor;
var keys = {
    q:81,
    w:87,
    a:65,
    s:83
};

$start.click(startGame());

function startGame() {

        function randomNumber() {
            for (var i = 0; i < playerSequence.length; i++) {
                randomColor = Math.floor((Math.random() * 4) + 1);
                gameSequence.push(randomColor);
                console.log(gameSequence)
            }
        }

        randomNumber();
        function animateOpacity(toBeAnimated) {
            toBeAnimated.animate({
                    opacity: "1"
                },
                {
                    duration: '100',
                    complete: function () {
                        toBeAnimated.animate({opacity: '.5'}, 300)
                    }
                });
        }


        function keyLogging() {
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
    keyLogging();
    }

