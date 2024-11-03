document.addEventListener('DOMContentLoaded', function() {
    console.log("Contact page loaded successfully.");

    const profileImage = document.getElementById('profileImage');
    const contactBox = document.querySelector('.contact-box');
    const body = document.body;
    let imageToggled = false;

    profileImage.addEventListener('click', toggleImage);

    // Adding event listener to reset the view
    body.addEventListener('click', function(event) {
        if (imageToggled && event.target !== profileImage) {
            resetImageAndBlur();
        }
    });

    function toggleImage() {
        imageToggled = !imageToggled;
        if (imageToggled) {
            profileImage.style.transform = 'scale(2) translateY(-150px)';
            profileImage.style.zIndex = '3'; // Bring image to front
            body.classList.add('blur-effect');
        } else {
            resetImageAndBlur();
        1
    }

    function resetImageAndBlur() {
        imageToggled = false;
        profileImage.style.transform = 'scale(1) translateY(0)';
        profileImage.style.zIndex = '2'; // Reset z-index to default
        body.classList.remove('blur-effect');
    }
});
