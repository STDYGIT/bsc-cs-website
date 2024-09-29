document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.querySelector('.theme-switch');
    const contactIcon = document.getElementById('contact-icon');
    const contactOpenIcon = document.getElementById('contact-open-icon');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme);
    themeSwitch.classList.toggle('dark-theme', savedTheme === 'dark');

    themeSwitch.addEventListener('click', toggleTheme);
    contactIcon.addEventListener('click', openContactBox);
    contactOpenIcon.addEventListener('click', openContactBox);

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

    function openContactBox() {
        // Implement the functionality to open the contact box
        window.location.href = 'contacts/contact.html'; // Example action
    }
});

document.getElementById('home-button').addEventListener('click', function() {
    if (window.location.pathname === '/HOME.html' || window.location.pathname === '/') {
        window.location.reload(); // Reloads the page if it's already the homepage
    } else {
        window.location.href = 'HOME.html'; // Navigates to the homepage if not already there
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const phrases = ["Softwares ⎋ !","last year question papers!!", "video resources!!!", "Your Results!!", "course syllabus!!!!"];
    const typewriterElement = document.querySelector('.typewriter');
    const typingSpeed = 50;
    const backspacingSpeed = 50;
    const pauseBetweenPhrases = 2000;
    const pauseAfterCompleteTyping = 1000;

    let currentPhraseIndex = 0;

    function typePhrase(phrase) {
        return new Promise(resolve => {
            let i = 0;
            typewriterElement.textContent = '';
            const typingInterval = setInterval(() => {
                typewriterElement.textContent += phrase.charAt(i);
                i++;
                if (i > phrase.length) {
                    clearInterval(typingInterval);
                    setTimeout(() => {
                        backspacePhrase(phrase).then(resolve);
                    }, pauseAfterCompleteTyping);
                }
            }, typingSpeed);
        });
    }

    function backspacePhrase(phrase) {
        return new Promise(resolve => {
            let i = phrase.length;
            const backspacingInterval = setInterval(() => {
                typewriterElement.textContent = phrase.substring(0, i);
                i--;
                if (i < 0) {
                    clearInterval(backspacingInterval);
                    setTimeout(() => {
                        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                        typePhrase(phrases[currentPhraseIndex]).then(resolve);
                    }, pauseBetweenPhrases);
                }
            }, backspacingSpeed);
        });
    }

    function startTypewriter() {
        typePhrase(phrases[currentPhraseIndex]);
    }

    startTypewriter();
});
