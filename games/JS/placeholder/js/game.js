var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRad = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var paddleSpeed = 7;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for(c = 0;c < brickColumnCount; c++)
{
    bricks[c] = [];
    for(r = 0;r < brickRowCount; r++)
      bricks[c][r] = {x: 0,y: 0,status: 1}
}
var score = 0;
var lives = 3;

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove",mouseMoveHandler,false);

function mouseMoveHandler(e)
{
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX - paddleWidth/2 > 0 && relativeX + paddleWidth/2 < canvas.width)
    paddleX = relativeX - paddleWidth/2;
}

function keyDownHandler(e)
{
  if(e.keyCode == 39)
    rightPressed = true;
  else if(e.keyCode == 37)
    leftPressed = true;
}

function keyUpHandler(e)
{
  if(e.keyCode == 39)
    rightPressed = false;
  else if(e.keyCode == 37)
    leftPressed = false;
}

function collisionDetection()
{
  for(c = 0;c < brickColumnCount; c++)
  {
    for(r = 0;r < brickRowCount; r++)
    {
      var b = bricks[c][r];
      if(b.status == 1)
      {
        if(x > b.x && x < b.x + brickWidth && y > b.y - ballRad && y < b.y + brickHeight + ballRad)
        {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount * brickColumnCount)
          {
            alert("Winner");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawLives()
{
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives,canvas.width - 65,20);
}

function drawScore()
{
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score,8,20);
}

function drawBricks()
{
  for(c = 0;c < brickColumnCount; c++)
  {
    for(r=0;r < brickRowCount; r++)
    {
      if(bricks[c][r].status == 1)
      {
        var brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX,brickY,brickWidth,brickHeight);
        ctx.fillStyle = "#00DD55";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawBall()
{
  ctx.beginPath();
  ctx.arc(x,y,ballRad,0,Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle()
{
  ctx.beginPath();
  ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw()
{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawScore();
  drawLives();
  drawBall();
  drawPaddle();
  drawBricks();
  x += dx;
  y += dy;
  collisionDetection();
  if (x + dx > canvas.width - ballRad || x + dx < ballRad)
    dx = -dx;
  if(y + dy < ballRad)
    dy = -dy;
  else if((y + dy > canvas.height - ballRad - paddleHeight) && x > paddleX && x < paddleX + paddleWidth)
    dy = -dy;
  else if(y + dy > canvas.height - ballRad)
  {
    lives--;
    x = canvas.width/2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
    if(lives == 0)
    {
      alert('Game Over');
      document.location.reload();
    }
  }
  if(rightPressed && paddleX < canvas.width-paddleWidth)
    paddleX += paddleSpeed;
  else if(leftPressed && paddleX > 0)
    paddleX -= paddleSpeed;

  requestAnimationFrame(draw);
}

draw();
