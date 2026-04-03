document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Get accepted logins from localStorage
    const acceptedLogins = JSON.parse(localStorage.getItem('acceptedLogins')) || {};
    
    // Check if username exists and password matches
    if (acceptedLogins[username] && acceptedLogins[username] === password) {
        // Login successful, store current user
        localStorage.setItem('currentUser', username);
        // Redirect to home page
        window.location.href = 'home.html';
    } else {
        // Login failed
        alert('Invalid username or password. Please try again.');
    }
});
