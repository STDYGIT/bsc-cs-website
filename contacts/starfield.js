const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
const stars = [];
const starCount = 500;
let speed = 1;

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (stars.length === 0) {
    createStars();
  } else {
    for (let i = 0; i < starCount; i++) {
      stars[i].x = canvas.width / 2 + (Math.random() - 0.5) * canvas.width; // Spread horizontally
      stars[i].y = Math.random() * canvas.height;
      stars[i].z = Math.random() * canvas.width; // Random depth
    }
  }
  setSpeedBasedOnScreenSize();
}

function createStars() {
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * canvas.width, // Spread horizontally
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
      brightness: Math.random() * 0.8 + 0.2,
      size: Math.random() * 2 + 1,
      color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < starCount; i++) {
    let star = stars[i];
    star.z -= speed;

    // Reset position when star goes off-screen
    if (star.z <= 0) {
      star.z = canvas.width;
      star.x = canvas.width / 2 + (Math.random() - 0.5) * canvas.width; // Spread horizontally
      star.y = Math.random() * canvas.height;
      star.brightness = Math.random() * 0.8 + 0.2;
      star.size = Math.random() * 2 + 1;
      star.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
    }

    // Calculate position based on depth
    let k = 1 - star.z / canvas.width;
    let scale = k * k * k;
    let x = (star.x - canvas.width / 2) * scale + canvas.width / 2;
    let y = (star.y - canvas.height / 2) * scale + canvas.height / 2;
    let r = star.size * scale;

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = star.color;
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

function setSpeedBasedOnScreenSize() {
  if (window.innerWidth >= 1200) {
    speed = 2;
  } else if (window.innerWidth >= 800) {
    speed = 1.5;
  } else if (window.innerWidth >= 600) {
    speed = 1;
  } else {
    speed = 0.5;
  }
}

window.addEventListener('resize', initCanvas);
initCanvas();
animate();