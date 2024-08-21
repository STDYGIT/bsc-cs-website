document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.querySelector('.theme-switch');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme);
    themeSwitch.classList.toggle('dark-theme', savedTheme === 'dark');

    themeSwitch.addEventListener('click', toggleTheme);

    let touchStartX = 0;
    let touchEndX = 0;

    themeSwitch.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    themeSwitch.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    });

    function handleSwipeGesture() {
        if (touchEndX < touchStartX && !document.body.classList.contains('dark')) {
            toggleTheme();
        } else if (touchEndX > touchStartX && document.body.classList.contains('dark')) {
            toggleTheme();
        }
    }

    function toggleTheme() {
        if (document.body.classList.contains('dark')) {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        themeSwitch.classList.toggle('dark-theme');
    }
});
document.getElementById('home-button').addEventListener('click', function() {
    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        window.location.reload(); // Reloads the page if it's already the homepage
    } else {
        window.location.href = 'index.html'; // Navigates to the homepage if not already there
    }
});
