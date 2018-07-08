
$.fn.trivia = function() {
    var _g = this;
    _g.userPick = null;
    _g.answers = {
        correct: 0,
        incorrect: 0
    };
    _g.images = null;
    _g.count = 30;
    _g.current = 0;
    _g.questions = [{
        question: "Where is the capital of Canada Located?",
        choices: ["Ottawa", "Toronto", "Tokyo", "Montreal"],
        images: ["../images/Rajah.gif"],
        correct: 0
    },  {
        question: "Which city has the third largest population in the United States?",
        choices: ["Chicago", "Dallas", "Los Angeles", "Pheonix"],
        correct: 0

    }, {
        question: "The city of Lagos is located in which country?",
        choices: ["Lord of the rings", "England", "Nigeria", "Columbia"],
        correct: 2

    }, {
        question: "Which city is currently the most Eco Friendly in the United States?",
        choices: ["El Paso", "New York", "San Fransisco", "Des Moines"],
        correct: 2

    }, ];
    _g.ask = function() {
        if (_g.questions[_g.current]) {
            $("#timer").html("Time remaining: " + "00:" + _g.count + " secs");
            $("#question_div").html(_g.questions[_g.current].question);
            var choicesArr = _g.questions[_g.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(_g.timer, 1000);
        } else {
            $('body').append($('<div />', {
                text: 'Unanswered: ' + (
                    _g.questions.length - (_g.answers.correct + _g.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('body').show();
        }
    };
    _g.timer = function() {
        _g.count--;
        if (_g.count <= 0) {
            setTimeout(function() {
                _g.nextQ();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + _g.count + " secs");
        }
    };
    _g.nextQ = function() {
        _g.current++;
        clearInterval(window.triviaCounter);
        _g.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            _g.cleanUp();
            _g.ask();
        }, 1000)
    };
    _g.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + _g.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + _g.answers.incorrect);
    };
    _g.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        _g.answers[string]++;
        $('.' + string).html(string + ' answers: ' + _g.answers[string]);
    };
    return _g;
};
var Trivia;

$("#start_button").click(function() {
    $(this).hide();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#choices_div').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        _g = Trivia || $(window).trivia(),
        index = _g.questions[_g.current].correct,
        correct = _g.questions[_g.current].choices[index];

    if (userPick !== index) {
        $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
        _g.answer(false);
    } else {
        $('#choices_div').text("Correct!!! The correct answer was: " + correct);
        _g.answer(true);
    }
    _g.nextQ();
});