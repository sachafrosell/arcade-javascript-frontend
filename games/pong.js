
var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
var paddle2Y = 250;
const paddleWidth = 10
const paddleHeight = 100

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};

}

window.onload = function() {

	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');


	var framesPerSecond = 50;
	setInterval(function(){
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);

	canvas.addEventListener('mousemove', function(evt){
		var mousePos = calculateMousePos(evt);
			paddle1Y = mousePos.y-(paddleHeight/2)
	})

}

function ballReset() {
	canvas.addEventListener('click', function(evt){
		ballSpeedX = -ballSpeedX;
		ballX = canvas.width/2;
		ballY = canvas.height/2;
	})

}

function computerMovement() {
	var paddle2YCenter = paddle2Y + (paddleHeight/2)
	if(paddle2YCenter < ballY-35) {
		paddle2Y += 6;
	} else if (paddle2YCenter > ballY+35) {
		paddle2Y -= 6;
	}
	}


function moveEverything() {
		computerMovement();


	ballX = ballX + ballSpeedX;
	ballY = ballY + ballSpeedY;

	if(ballX < 20) {
		if(ballY > paddle1Y &&
		   ballY < paddle1Y+paddleHeight) {
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY
					-(paddle1Y+paddleHeight/2);
			ballSpeedY = deltaY * 0.2;
		} else {
		ballReset();
	}
}
	if(ballX > canvas.width-20) {
		if(ballY > paddle2Y &&
		   ballY < paddle2Y+paddleHeight) {
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY
					-(paddle2Y+paddleHeight/2);
			ballSpeedY = deltaY * 0.2;
		} else {
		ballReset();
	}
	}
		if(ballY < 0) {
		ballSpeedY = -ballSpeedY;
	}
	if(ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}
	}

function drawEverything() {

	// black canvas
	colorRect(0,0,canvas.width,canvas.height,'black');

	// left player paddle
	colorRect(0,paddle1Y,paddleWidth,paddleHeight,'white');

	// right paddle
	colorRect(canvas.width-paddleWidth,paddle2Y,paddleWidth,paddleHeight,'white');

	//  ball
	colorCircle(ballX, ballY, 10, 'white');
}

function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();

}



function colorRect(leftX,topY,width,height, drawColour) {
	canvasContext.fillStyle = drawColour;
	canvasContext.fillRect(leftX,topY,width,height);
}
