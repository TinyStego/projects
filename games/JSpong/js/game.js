var canvas
var canvasContext

var ballX = 400
var ballY = 300
var ballSpeedX = initialXSpeed = -10
var ballSpeedY = initialYSpeed = 10

var lPaddleY = 250
var rPaddleY = 350
var rPaddleSpeed = 20
var paddleX = 5

var lScore = 0
var rScore = 0

var winScreen = false

const PADDLE_HEIGHT = 75
const PADDLE_WIDTH = 10
const BALL_HEIGHT = 10
const BALL_WIDTH = 10
const WIN_CONDITION = 2

function mouseClick()
{
  if(winScreen)
  {
    lScore = rScore = 0
    winScreen = false
  }
}

window.onload = function()
{
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')
  draw()

  var fps = 30
  setInterval(function()
  {
    draw()
    move()
  }, 1000/fps)
  // grab mouse input with an Event Listener
  // js runs the mousePos when it gets mouse input
  canvas.addEventListener('mousemove',
    function(evt)
    {
      var mouse = mousePos(evt)

      lPaddleY = mouse.y - (PADDLE_HEIGHT/2)
    })

  canvas.addEventListener('mousedown',mouseClick)
}

function reset()
{
  if(lScore >= WIN_CONDITION || rScore >= WIN_CONDITION)
    winScreen = true

  ballX = canvas.width / 2 - 5
  ballY = canvas.height / 2 - 5
  ballSpeedX = (ballSpeedX < 0) ? initialXSpeed:-initialXSpeed
  ballSpeedY = initialYSpeed
}

function drawNet()
{
  for(var i=0; i<canvas.height; i+=41.5)
    colorObj(canvas.width/2-1,i,2,20,'white')
}

function draw()
{
  // draw the background
  colorObj(0,0,canvas.width,canvas.height,'black')
  //draw left paddle
  colorObj(paddleX,lPaddleY,PADDLE_WIDTH,PADDLE_HEIGHT,'white')
  //draw right paddle
  colorObj(canvas.width - PADDLE_WIDTH - paddleX,rPaddleY,PADDLE_WIDTH,PADDLE_HEIGHT,'white')
  drawNet()
  //draw ball
  colorObj(ballX,ballY,BALL_WIDTH,BALL_HEIGHT,'white')
  if(winScreen)
  {
    canvasContext.font = '40px Arial'
    if(lScore >= WIN_CONDITION)
    {
      canvasContext.fillText("Left Player Won!", 45, 150)
      canvasContext.font = '20px Arial'
      canvasContext.fillText("click to continue", 525, 500)
    }
    else if(rScore >= WIN_CONDITION)
    {
      canvasContext.fillText("Right Player Won!", 445, 150)
      canvasContext.font = '20px Arial'
      canvasContext.fillText("click to continue", 125, 500)
    }

    return
  }
  canvasContext.font = '35px Arial'
  canvasContext.fillText(lScore,canvas.width/4,75)
  canvasContext.fillText(rScore,canvas.width - canvas.width/4,75)
}

function hit()
{
  var deltaY
  if(ballSpeedX < 0)
  {
    ballSpeedX *= -1
    ballSpeedX += .3
    deltaY = ballY - (lPaddleY + PADDLE_HEIGHT/2)
    ballSpeedY = deltaY * .3
  }
  else
  {
    ballSpeedX *= -1
    ballSpeedX -= .3
    deltaY = ballY - (rPaddleY + PADDLE_HEIGHT/2)
    ballSpeedY = deltaY * .35
  }
}

function comMove()
{
  var rPaddelCent = rPaddleY + (PADDLE_HEIGHT/2)
  if(ballX > canvas.width / 2 && rPaddelCent < ballY - 15)
    rPaddleY += rPaddleSpeed
  else if(ballX > canvas.width / 2 && rPaddelCent > ballY + 15)
    rPaddleY -= rPaddleSpeed
}

function move()
{
  if(winScreen)
    return

  comMove()

  ballX += ballSpeedX
  ballY += ballSpeedY

  if(ballX > canvas.width - PADDLE_WIDTH  - paddleX - BALL_WIDTH && (ballY > rPaddleY - BALL_HEIGHT && ballY < rPaddleY + PADDLE_HEIGHT))
    hit()
  else if(ballX > canvas.width - BALL_WIDTH)
  {
    lScore++
    reset()
  }
  else if(ballX < paddleX + PADDLE_WIDTH && (ballY > lPaddleY - BALL_HEIGHT && ballY < lPaddleY + PADDLE_HEIGHT))
    hit()
  else if(ballX < 0)
  {
    rScore++
    reset()
  }

  if(ballY > canvas.height - BALL_HEIGHT)
    ballSpeedY *= -1
  else if(ballY < 0)
    ballSpeedY *= -1

  if(lPaddleY <= 0)
    lPaddleY = 0
  else if(lPaddleY >= canvas.height - PADDLE_HEIGHT)
    lPaddleY = canvas.height - PADDLE_HEIGHT

  if(rPaddleY <= 0)
    rPaddleY = 0
  else if(rPaddleY >= canvas.height - PADDLE_HEIGHT)
    rPaddleY = canvas.height - PADDLE_HEIGHT
}

function colorObj(left,top,width,height,color)
{
  canvasContext.fillStyle = color
  canvasContext.fillRect(left,top,width,height)
}

// finds the mouse coordinates within the canvas on the web page
function mousePos(evt)
{
  // get dimensions of canvas
  var rect = canvas.getBoundingClientRect()
  // get dimensions of the entire page
  var root = document.documentElement
  // retrieve mouse X coord if it is within the width of the canvas on the page
  var mouseX = evt.clientX - rect.left - root.scrollLeft
  // retrieve mouse Y coord if it is within the height of the canvas on the page
  var mouseY = evt.clientY - rect.top - root.scrollTop

  return {y:mouseY,x:mouseX}
}
