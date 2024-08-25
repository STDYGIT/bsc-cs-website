const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
const stars = [];
const starCount = 500; // Increased number of stars
let speed = 1; // Initial speed

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Only create stars once
  if (stars.length === 0) {
    createStars();
  } else {
    // Update existing star positions on resize
    for (let i = 0; i < starCount; i++) {
      stars[i].x = Math.random() * canvas.width;
      stars[i].y = Math.random() * canvas.height;
      stars[i].z = Math.random() * canvas.width;
    }
  }

  // Adjust speed based on screen width
  speed = Math.max(0.5, 1 - (canvas.width / 1000)); // Slow down for smaller widths
}

function createStars() {
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
      brightness: Math.random() * 0.8 + 0.2, // Random brightness, higher range
      size: Math.random() * 2 + 1, // Variable size
      color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})` // Realistic star color range
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < starCount; i++) {
    let star = stars[i];
    star.z -= speed; // Use the calculated speed

    if (star.z <= 0) {
      star.z = canvas.width;
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height;
      star.brightness = Math.random() * 0.8 + 0.2; // Reset brightness
      star.size = Math.random() * 2 + 1; // Reset size
      star.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`; // Reset color
    }

    let k = 1 - star.z / canvas.width;
    let scale = k * k * k;

    let x = (star.x - canvas.width / 2) * scale + canvas.width / 2;
    let y = (star.y - canvas.height / 2) * scale + canvas.height / 2;
    let r = star.size * scale; // Slightly larger radius

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = star.color; // Brighter stars
    ctx.fill();
  }
  requestAnimationFrame(animate);
}

window.addEventListener('resize', initCanvas);
initCanvas();
animate();