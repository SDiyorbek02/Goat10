const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particlesArray;
const colors = ["#c0c0c0", "#ffcc00", "#999"];
const maxSize = 3;
const minSize = 0.5;
const numberOfParticles = 100;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Particle(x, y, dx, dy, size, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.size = size;
  this.color = color;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = function () {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx = -this.dx;
    if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * maxSize + minSize;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let dx = (Math.random() - 0.5) * 0.7;
    let dy = (Math.random() - 0.5) * 0.7;
    let color = colors[Math.floor(Math.random() * colors.length)];
    particlesArray.push(new Particle(x, y, dx, dy, size, color));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => p.update());
  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animateParticles();