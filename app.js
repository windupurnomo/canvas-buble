const N = 1000;
const MAX_RADIUS = 40;
var W = window.innerWidth;
var H = window.innerHeight;
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

const colors = ['#96CEB4', '#FFEEAD', '#FF6F69', '#FFCC5C', '#AAD8B0'];
var mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener('mousemove', event => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', event => {
  init();
});

function Circle(xCoord, yCoord, xSpeed, ySpeed, rad) {
  this.x = xCoord;
  this.y = yCoord;
  this.dx = xSpeed;
  this.dy = ySpeed;
  this.radius = rad;
  this.minRadius = rad;
  this.color = colors[Math.floor(Math.random() * colors.length)];

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 3 * Math.PI);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = () => {
    if (this.x + this.radius > W || this.x - this.radius < 0)
      this.dx = -this.dx;
    if (this.y + this.radius > H || this.y - this.radius < 0)
      this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < MAX_RADIUS) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
    this.draw();
  };
}

//const circle = new Circle(x, y, dx, dy, radius);
//const circle = new Circle(100, 100, 4, 4, 30);

var circles = [];
const init = () => {
  canvas.width = W;
  canvas.height = H;
  circles = [];
  for (let i = 0; i < N; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (W - radius * 2) + radius;
    var y = Math.random() * (H - radius * 2) + radius;
    var dx = Math.random() - 0.5;
    var dy = Math.random() - 0.5;
    circles.push(new Circle(x, y, dx, dy, radius));
  }
  animate();
};

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, W, H);
  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
  }
};

init();
