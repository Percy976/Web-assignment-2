document.getElementById('newUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Check if passwords match
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match. Please try again.';
        return;
    }
    
    // Get existing logins from localStorage or create an empty object
    let acceptedLogins = JSON.parse(localStorage.getItem('acceptedLogins')) || {};
    
    // Check if username already exists
    if (acceptedLogins[username]) {
        errorMessage.textContent = 'Username already exists. Please choose a different username.';
        return;
    }
    
    // Add new user to accepted logins
    acceptedLogins[username] = password;
    localStorage.setItem('acceptedLogins', JSON.stringify(acceptedLogins));
    
    // Clear form and show success message
    errorMessage.style.color = 'green';
    errorMessage.textContent = 'Account created successfully! Redirecting to login...';
    document.getElementById('newUserForm').reset();
    
    // Redirect to login page after 2 seconds
    setTimeout(function() {
        window.location.href = 'login.html';
    }, 2000);
});