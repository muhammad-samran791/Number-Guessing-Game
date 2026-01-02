const winNo = Math.floor(Math.random() * 100) + 1;

const noInp = document.querySelector("#noInp");
const sub = document.querySelector("#sub");
const result = document.querySelector("#result");
const attempts = document.querySelector("#attempts");

let count = 1;
let hasWon = false;

sub.addEventListener("click", () => {
  if (hasWon) return;

  const value = parseInt(noInp.value);

  if (isNaN(value)) {
    result.textContent = "Enter a number first";
    return;
  }

  if (value === winNo) {
    result.textContent = "Congratulations, You win!!!";
    attempts.textContent = count;
    hasWon = true;
    fireConfetti(); // 🎉 ONLY HERE
  } else if (value < winNo) {
    result.textContent = "Too low! Try again";
    attempts.textContent = count++;
  } else {
    result.textContent = "Too high! Try again";
    attempts.textContent = count++;
  }
});

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let W, H;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const colors = ["#ff4d4f", "#40c9ff", "#f9c74f", "#a855f7", "#22c55e"];
let particles = [];

class Confetti {
  constructor() {
    this.x = W / 2;
    this.y = H / 2;
    this.size = Math.random() * 8 + 4;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedX = (Math.random() - 0.5) * 12;
    this.speedY = Math.random() * -12 - 4;
    this.gravity = 0.3;
    this.rotation = Math.random() * 360;
    this.spin = (Math.random() - 0.5) * 10;
    this.life = 100;
  }

  update() {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.spin;
    this.life--;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

function fireConfetti() {
  for (let i = 0; i < 120; i++) {
    particles.push(new Confetti());
  }
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  particles = particles.filter((p) => p.life > 0);

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();
