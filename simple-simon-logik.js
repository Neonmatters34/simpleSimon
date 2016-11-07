/*** Created by ya boi*/
$(function () {
    var $topLeft = $('#triangle-top-left');
    var $topRight = $('#triangle-top-right');
    var $bottomLeft = $('#triangle-bottom-left');
    var $bottomRight = $('#triangle-bottom-right');
    var $start = $('#center-square');
    var $round = $('#round');
    var round = 1;
    var haveWeAlreadyStartedListeningForButtonPresses = false;
    var sequencePositionToCheck = 0;//used as the index to be checked for the sequences
    var playerSequence = [];
    var startOnOff = false;
    var gameSequence = [];//holds random number order
    var keys = {
        q: 81,
        w: 87,
        a: 65,
        s: 83
    };
    //number gets pushed to gameSequence
    function randomNumber() {
        gameSequence.push(Math.floor((Math.random() * 4) + 1));
    }

    function animateOpacity(toBeAnimated) {
        var triangleToAnimate;
        if (typeof toBeAnimated == 'number') {//if the input is a number then it animates based on gameSequence
            if (toBeAnimated == 1) {
                triangleToAnimate = $topLeft;
            } else if (toBeAnimated == 2) {
                triangleToAnimate = $topRight;
            } else if (toBeAnimated == 4) {
                triangleToAnimate = $bottomLeft;
            } else if (toBeAnimated == 3) {
                triangleToAnimate = $bottomRight
            }
        } else {                                     //otherwise it animates based on the element input. see:lightUpButtonOnKeypress
            triangleToAnimate = toBeAnimated;
        }
        triangleToAnimate.stop().animate({
                opacity: "1"
            },
            {
                complete: function () {
                    triangleToAnimate.animate({opacity: '.3'}, 40)
                }
            });

    }

    //lights up buttons based on gameSequence
    function displaySequence() {
        $.each(gameSequence, function (index, element) {
            setTimeout(function () {
                animateOpacity(element);
            }, index * 600);
        });
    }

    //listens for keys q,w,s,a then disables them
    function lightUpButtonOnKeypress() {
        if (haveWeAlreadyStartedListeningForButtonPresses == false) {
            $(document).keyup(function (e) {

                if (e.keyCode === keys.a) {
                    animateOpacity($bottomLeft);
                    playerSequence.push(4);
                    compareSequences();//TODO

                } else if (e.keyCode === keys.q) {
                    animateOpacity($topLeft);
                    playerSequence.push(1);
                    compareSequences();//TODO

                } else if (e.keyCode === keys.w) {
                    animateOpacity($topRight);
                    playerSequence.push(2);
                    compareSequences();//TODO

                } else if (e.keyCode === keys.s) {
                    animateOpacity($bottomRight);
                    playerSequence.push(3);
                    compareSequences(); //once a key is pressed checks arrays against eachother
                }
            });
            haveWeAlreadyStartedListeningForButtonPresses = true;
        }
    }

    function clearSequencesForReplay() {
        gameSequence = [];
        round = 1;
    }

    //shows play again text
    function playAgainText() {
        $('#start').show().text('You Lose.' + 'Play again?');

    }

    //checking for correct pressed and triggers next round and game over state.
    function compareSequences() {

        //correct press
        if (playerSequence[sequencePositionToCheck] == gameSequence[sequencePositionToCheck]) {
            sequencePositionToCheck++;
        } else {
            //incorrect press
            startOnOff = false;
            clickStart();
            playAgainText();
        }//correct press and sequence finished
        if (sequencePositionToCheck == gameSequence.length) {
            round++;
            window.setTimeout(nextLevel, 900);

        }
    }

    function nextLevel() {

        $round.text('round ' + round);
        playerSequence = [];
        sequencePositionToCheck = 0;
        randomNumber();
        displaySequence();
        lightUpButtonOnKeypress();
    }

    function startGame() {
        clearSequencesForReplay();
        nextLevel();
    }

//starts game when start is clicked
    function clickStart() {
        $start.click(function () {
            if (startOnOff == false)
                startGame();
            $('#start').hide();
            startOnOff = true;
        })
    }

    clickStart();
});