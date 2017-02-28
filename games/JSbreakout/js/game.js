var canvas, canvasContext
var ballRad = 10
var ballX
var ballY
var ballSpeedX = 5
var ballSpeedY = 5
var bricksLeft = 0

var mouseX = mouseY = 0

const BRICK_WIDTH = 80
const BRICK_HEIGHT = 20
const BRICK_GAP = 2
const BRICK_ROWS = 14
const BRICK_COL = 10
const PADDLE_WIDTH = 100
const PADDLE_HEIGHT = 10
const PADDLE_DIST_FROM_EDGE = 60

var brickGrid = new Array(BRICK_COL * BRICK_ROWS)

var paddleX = 700

function updateMousePos(evt)
{
  var rect = canvas.getBoundingClientRect()
  var root = document.documentElement

  mouseX = evt.clientX - rect.left - root.scrollLeft
  mouseY = evt.clientY - rect.top - root.scrollTop

  paddleX = mouseX - PADDLE_WIDTH/2
}

function brickReset()
{
  var i
  for(i=0;i<3*BRICK_COL;i++)
    brickGrid[i] = false
  for(;i<BRICK_COL*BRICK_ROWS;i++)
  {
    brickGrid[i] = true
    bricksLeft++
  }
}

window.onload = function()
{
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')

  var fps = 30
  setInterval(updateAll, 1000/fps)

  canvas.addEventListener('mousemove', updateMousePos)

  brickReset()
  reset()
}

function updateAll()
{
  moveAll()
  drawAll()
}

function reset()
{
  ballX = canvas.width/2
  ballY = canvas.height/2
}

function ballMove()
{
  ballX += ballSpeedX
  ballY += ballSpeedY

  if(ballX >= canvas.width - ballRad && ballSpeedX > 0.0)
    ballSpeedX *= -1
  else if(ballX <= ballRad && ballSpeedX < 0)
    ballSpeedX *= -1
  if(ballY > canvas.height - ballRad)
  {
    reset()
    brickReset()
  }
  else if(ballY < ballRad && ballSpeedY < 0.0)
    ballSpeedY *= -1
}

function isBrickAtColRow(col,row)
{
  if(col >= 0 && col < BRICK_COL &&
     row >= 0 && row < BRICK_ROWS)
  {
    var brickIndexUnderCoord = rowColToArrayIndex(col,row)

    return brickGrid[brickIndexUnderCoord]
  } else
    return false
}

function ballBrickHandling()
{
  var ballBrickCol = Math.floor(ballX / BRICK_WIDTH)
  var ballBrickRow = Math.floor(ballY / BRICK_HEIGHT)
  var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol,ballBrickRow)

  if(ballBrickCol >= 0 && ballBrickCol < BRICK_COL &&
     ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS)
  {
    if(isBrickAtColRow(ballBrickCol,ballBrickRow))
    {
      brickGrid[brickIndexUnderBall] = false
      bricksLeft--
      console.log(bricksLeft)

      var prevBallX = ballX - ballSpeedX
      var prevBallY = ballY - ballSpeedY
      var prevBrickCol = Math.floor(prevBallX / BRICK_WIDTH)
      var prevBrickRow = Math.floor(prevBallY / BRICK_HEIGHT)

      var bothTestsFailed = true

      if(prevBrickCol != ballBrickCol)
      {
        if(!isBrickAtColRow(prevBrickCol,ballBrickRow))
        {
          ballSpeedX *= -1
          bothTestsFailed = false
        }
      }
      if(prevBrickRow != ballBrickRow)
      {
        if(!isBrickAtColRow(prevBrickRow,ballBrickCol))
        {
          ballSpeedY *= -1
          bothTestsFailed = false
        }
      }
      if(bothTestsFailed)
      {
        ballSpeedY *= -1
        ballSpeedX *= -1
      }
    }
  }
}

function ballPaddleHandling()
{
  var paddleTop = canvas.height-PADDLE_DIST_FROM_EDGE
  var paddleBottom = paddleTop + PADDLE_HEIGHT
  var paddleLeft = paddleX
  var paddleRight = paddleLeft + PADDLE_WIDTH

  if(ballY > paddleTop - ballRad &&           // below the top of paddle minus the ball radius
     ballY < paddleBottom &&                  // above the bottom of paddle
     ballX > paddleLeft &&                    // right of left of paddle
     ballX < paddleRight)                     // left of right of paddle
  {
    ballSpeedY *= -1

    var centerOfPaddleX = paddleX + PADDLE_WIDTH/2
    var ballDistFromPaddleCenter = ballX - centerOfPaddleX
    ballSpeedX = ballDistFromPaddleCenter * .3

    if(bricksLeft <= 0)
      brickReset()
  }
}

function moveAll()
{
  ballMove()
  ballBrickHandling()
  ballPaddleHandling()
}

function drawAll()
{
  colorRect(0,0,canvas.width,canvas.height,'black')

  colorRect(paddleX,canvas.height-PADDLE_DIST_FROM_EDGE,PADDLE_WIDTH,PADDLE_HEIGHT,'white')

  colorCircle(ballX,ballY,ballRad,'white')

  drawBricks()
}

function rowColToArrayIndex(col,row)
{
  return col + BRICK_COL * row
}

function drawBricks()
{
  for(var row=0;row<BRICK_ROWS;row++)
  {
    for(var col=0;col<BRICK_COL;col++)
    {
      var arrayIndex = rowColToArrayIndex(col,row)

      if(brickGrid[arrayIndex])
        colorRect(BRICK_WIDTH*col,BRICK_HEIGHT*row,BRICK_WIDTH-BRICK_GAP,BRICK_HEIGHT-BRICK_GAP,"orange")
    }
  }
}

function colorText(words,x,y,color)
{
  canvasContext.fillStyle = color
  canvasContext.fillText(words,x,y)
}

function colorRect(topLeftX,topLeftY,width,height,color)
{
  canvasContext.fillStyle = color
  canvasContext.fillRect(topLeftX,topLeftY,width,height)
}

function colorCircle(x,y,rad,color)
{
  canvasContext.fillStyle = color
  canvasContext.beginPath()

  canvasContext.arc(x,y,rad,0,Math.PI*2,true)
  canvasContext.fill()
}
