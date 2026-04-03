(function() {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    const postsKey = 'userPosts';
    let userPosts = JSON.parse(localStorage.getItem(postsKey)) || [];

    // Seed with Qhugh05 post if not already present
    const seedPostExists = userPosts.some(post => post.username === 'Qhugh05' && post.image === 'Images/Vacation.jpg');
    if (!seedPostExists) {
        userPosts.unshift({
            username: 'Qhugh05',
            text: 'Hello from my vacation!',
            image: 'Images/Vacation.jpg',
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(postsKey, JSON.stringify(userPosts));
    }

    // Seed a welcome post for the current user if not present
    const userPostExists = userPosts.some(post => post.username === currentUser);
    if (!userPostExists) {
        userPosts.unshift({
            username: currentUser,
            text: `Welcome to Pizza Social Media, ${currentUser}!`,
            image: 'Images/ProfilePic.jpg',
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(postsKey, JSON.stringify(userPosts));
    }

    const postsList = document.getElementById('postsList');
    postsList.innerHTML = '';

    userPosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'post-card';

        const author = document.createElement('h3');
        author.textContent = post.username;

        const time = document.createElement('p');
        time.textContent = new Date(post.timestamp).toLocaleString();
        time.className = 'post-time';

        const text = document.createElement('p');
        text.textContent = post.text;

        const img = document.createElement('img');
        img.src = post.image;
        img.alt = `${post.username} post image`;
        img.className = 'post-image';

        card.appendChild(author);
        card.appendChild(time);
        card.appendChild(text);
        card.appendChild(img);

        postsList.appendChild(card);
    });
})();

        postsList.appendChild(card);
    });
})();
