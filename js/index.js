const canvas = document.querySelector(`#canvas`)
const ctx = canvas.getContext("2d")
canvas.width = 500
canvas.height = 700

const roadImg = new Image()
roadImg.src= './images/road.png';

roadImg.onload = function () {
  ctx.drawImage(roadImg, 0, 0, 500, 700)
}

const carImg = new Image()
carImg.src = './images/car.png';
carImg.onload = function () {
  ctx.drawImage(carImg, 225, 550, 50, 100)
}

let road = {
  x: 0,
  y: 0,
  h: 500,
  w: 700,
  draw: function() {
    ctx.drawImage(roadImg, 0, 0, 500, 700 )
  }
}

let car = {
  x: 225,
  y: 550,
  h: 50,
  w: 100,
  draw: function() {
    ctx.drawImage(carImg,this.x, this.y, this.h, this.w)
  }
}

class Obstacle {
  constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "black"
  }
  draw = () => {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.h, this.w)
  }
  move = () => {
    this.y++
  }
}



setInterval(function () {
  obstacles.push(new Obstacle(Math.random()* canvas.width, 0, 20, (Math.random()*150) + 100 ))
  score +=1
}, 2000)

let score = 0
let obstacles = []

window.onkeydown = function (e) {
  if (e.key === 'ArrowLeft') {
    car.x-=10
  }
  if (e.key === 'ArrowRight') {
    car.x+=10
  }
}

function detectCollision(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y) {
      cancelAnimationFrame(gameInt)
      alert("GAME OVER")
  }
}

function animate() { 
  gameInt = requestAnimationFrame(animate) 
  ctx.clearRect(0, 0, canvas.width, canvas.height) 
  road.draw()
  car.draw()
  ctx.fillText(score, 20, 20, 200, 00)
  obstacles.forEach(eachObstacle => {
    eachObstacle.move()
    eachObstacle.draw()
    detectCollision(car,eachObstacle)
})
}

document.querySelector('#start-button').onclick = () => {
  animate()
}