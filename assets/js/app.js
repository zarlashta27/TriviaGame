
var triviaQuestions = [{
	question: "What was Walt Disney's full name?",
	answerList: ["Walter Herbert Disney","Walter Elias Disney","Walter Roy Disney","Walter Smith Disney"],
	answer: 1
},{
	question: "In what year was 'Snow White and the Seven Dwarfs' released?",
	answerList: ["1940","1937","1943","1950"],
	answer: 1
},{
	question: "What was the first half-hour animated show created by Disney?",
	answerList: ["Goof Troop","Mickey's Corner","DuckTales","Quack Pack"],
	answer: 2
},{
	question: "What are the names of Cinderella's evil stepsisters?",
	answerList: ["Anastasia and Drizella","Ana and Diana","Mary and Prudence","Beatrice and Daphine"],
	answer: 0
},{
	question: "Who created Mickey Mouse?",
	answerList: ["Walt Disney","John Wayne","Bill Clinton","Will Smith"],
	answer: 0
},{
	question: ["Which princess is based on a real person?"],
	answerList: ["Cinderella", "Snow White", "Pocahontas", "Ariel"],
	answer: 2
},{
	question: "In what decade were Mickey's best pals, Donald and Goofy, introduced?",
	answerList: ["1920's", "1930's", "1940's", "1950's"],
	answer: 1
},{
	question: "What is the name of the tea cup from Beauty and the Beast?",
	answerList: ["Chippy Potts","Mr. Potts","Chip Potts","Monsieur Potts"],
	answer: 2
},{
	question: "What do Aladdin and his monkey Abu steal from the marketplace when you’re first introduced to them in the movie?",    
	answerList: ["Bread","Apple","Cheese","Crackers"],
	answer: 0
},{
    question:"In Frozen, how many brothers does Hans have?",
    answerList: ["7","5","10","12"],
	answer: 3
}];

var gifArray = ['Question1', 'Question2', 'Question3', 'Question4', 'Question5', 'Question6', 'Question7', 'Question8', 'Question9', 'Question10'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
