document.addEventListener('DOMContentLoaded', () => {
        // Theme switch functionality
    // const themeSwitch = document.querySelector('.theme-switch');
    // const savedTheme = localStorage.getItem('theme') || 'light';
    // document.body.classList.add(savedTheme + '-theme');

    // themeSwitch.addEventListener('click', () => {
    //     document.body.classList.toggle('light-theme');
    //     document.body.classList.toggle('dark-theme');

    //     // Save theme preference to local storage
    //     const newTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    //     localStorage.setItem('theme', newTheme);
    // });
    const yearSelect = document.getElementById('year-select');
    const yearContents = document.querySelectorAll('.year-content');
    const noYearSelectedMessage = document.getElementById('no-year-selected');
    // Handle dropdown change event
    yearSelect.addEventListener('change', function () {
      const selectedYear = yearSelect.value;
  
      // Hide all year content sections initially
      yearContents.forEach(function (content) {
        content.style.display = 'none';
      });
  
      // Show selected year content section and remove the no year selected message
      noYearSelectedMessage.style.display = 'none';
  
      const selectedYearContent = document.getElementById(selectedYear);
      if (selectedYearContent) {
        selectedYearContent.style.display = 'block';
      }
    });
    // Swipe button functionality
    document.getElementById('year-select').addEventListener('change', function () {
        var selectedYear = this.value;
        document.querySelectorAll('.year-content').forEach(function (content) {
            content.style.display = 'none';
        });
        document.getElementById(selectedYear).style.display = 'block';
    });
    
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
            e.preventDefault();
            const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const moveX = currentX - startX;
            if (moveX > 0 && moveX < button.parentElement.offsetWidth - button.offsetWidth) {
                button.style.left = `${moveX}px`;
            }
        };

        const handleEnd = (e) => {
            e.preventDefault();
            isSwiping = false;
            button.style.transition = 'left 0.3s ease';
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
                    window.location.href = url;
                    setTimeout(() => {
                        location.reload();
                    }, 5000);
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
