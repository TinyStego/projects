var canvas, canvasContext
var ballRad = 10
var ballX = 100
var ballY = 100
var ballSpeedX = 5
var ballSpeedY = 5

window.onload = function()
{
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')

  var fps = 30
  setInterval(updateAll, 1000/fps)
}

function updateAll()
{
  moveAll()
  drawAll()
}

function moveAll()
{
  ballX += ballSpeedX
  ballY += ballSpeedY

  if(ballX > canvas.width - ballRad)
    ballSpeedX *= -1
  else if(ballX < ballRad)
    ballSpeedX *= -1
  if(ballY > canvas.height - ballRad)
    ballSpeedY *= -1
  else if(ballY < ballRad)
    ballSpeedY *= -1
}

function drawAll()
{
  canvasContext.fillStyle = 'black'
  canvasContext.fillRect(0,0,canvas.width,canvas.height)

  canvasContext.fillStyle = 'orange'
  canvasContext.beginPath()

  canvasContext.arc(ballX,ballY,ballRad,0,Math.PI*2,true)
  canvasContext.fill()
}
