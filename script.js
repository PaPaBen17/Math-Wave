document.addEventListener("DOMContentLoaded", function() {
    // Get the overlay and popup elements
    var overlay = document.getElementById('overlay');
    var popup = document.querySelector('.popup');
    
    // Show the overlay and popup when the page loads
    overlay.style.display = 'flex';
    popup.style.display = 'block';
});

function closePopup() {
    // Get the overlay and popup elements
    var overlay = document.getElementById('overlay');
    var popup = document.querySelector('.popup');
    
    // Hide the overlay and popup when the user clicks the close button
    overlay.style.display = 'none';
    popup.style.display = 'none';
}
