document.addEventListener('DOMContentLoaded', function () {
  const swipeButtons = document.querySelectorAll('.swipe-button');

  swipeButtons.forEach(button => {
    let startX = 0;
    let isSwiping = false;

    const handleStart = (e) => {
      e.preventDefault(); // Prevent text selection and other default behavior
      startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      isSwiping = true;
      button.style.transition = 'none'; // Disable transition during swipe
    };

    const handleMove = (e) => {
      if (!isSwiping) return;
      e.preventDefault(); // Prevent text selection and other default behavior
      const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const moveX = currentX - startX;
      if (moveX > 0 && moveX < button.parentElement.offsetWidth - button.offsetWidth) {
        button.style.left = `${moveX}px`;
      }
    };

    const handleEnd = (e) => {
      e.preventDefault(); // Prevent text selection and other default behavior
      isSwiping = false;
      button.style.transition = 'left 0.3s ease'; // Re-enable transition after swipe
      const buttonWidth = button.offsetWidth;
      const containerWidth = button.parentElement.offsetWidth;
      if (parseInt(button.style.left, 10) > (containerWidth - buttonWidth) / 2) {
        button.style.left = '100%';
        button.classList.add('active');
        const url = button.getAttribute('data-url');
        const downloadingText = document.createElement('div');
        downloadingText.classList.add('downloading-text');
        downloadingText.textContent = 'Downloading...';
        button.parentElement.appendChild(downloadingText);

        setTimeout(() => {
          // Initiate file download
          window.location.href = url;

          // Reload the page after a short delay
          setTimeout(() => {
            location.reload();
          }, 5000); // Adjust the delay as needed
        }, 300);
      } else {
        button.style.left = '0';
        button.classList.remove('active');
      }
    };

    button.addEventListener('touchstart', handleStart);
    button.addEventListener('mousedown', handleStart);

    button.addEventListener('touchmove', handleMove);
    button.addEventListener('mousemove', handleMove);

    button.addEventListener('touchend', handleEnd);
    button.addEventListener('mouseup', handleEnd);
    button.addEventListener('mouseleave', handleEnd);
  });
});
document.getElementById('home-button').addEventListener('click', function() {
    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        window.location.reload(); // Reloads the page if it's already the homepage
    } else {
        window.location.href = 'index.html'; // Navigates to the homepage if not already there
    }
});
