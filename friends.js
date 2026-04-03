// Check if user is logged in
const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
    window.location.href = 'index.html';
    return;
}

const friendsList = document.getElementById("friendsList");
const suggestedList = document.getElementById("suggestedList");
const searchInput = document.getElementById("searchBar");

// Get friends from localStorage or use defaults
let friends = JSON.parse(localStorage.getItem('userFriends')) || [
    { name: "Alex", status: "online", page: "Friend_Pages/testBlog.html" },
    { name: "Allen", status: "offline", page: "Friend_Pages/testBlog2.html" }
];

// Get suggested friends from registered users
function getSuggestedFriends() {
    const acceptedLogins = JSON.parse(localStorage.getItem('acceptedLogins')) || {};
    const allUsers = Object.keys(acceptedLogins);
    const friendNames = friends.map(f => f.name);
    let suggested = allUsers.filter(user => user !== currentUser && !friendNames.includes(user) && user !== 'Qhugh05');
    
    // Add Qhugh05 as suggested friend if not already a friend
    if (!friendNames.includes('Qhugh05') && currentUser !== 'Qhugh05') {
        suggested.unshift({ name: 'Qhugh05', status: 'online', image: 'Images/Football.jpg' });
    }
    
    // Add some fake accounts
    const fakeAccounts = [
        { name: 'Sam', status: 'online', image: 'Images/ProfilePic.jpg' },
        { name: 'Jamie', status: 'offline', image: 'Images/ProfilePic.jpg' },
        { name: 'Taylor', status: 'online', image: 'Images/ProfilePic.jpg' }
    ];
    
    fakeAccounts.forEach(fake => {
        suggested.push(fake);
    });
    
    return suggested.map(name => {
        if (typeof name === 'string') {
            return { name, status: "online", image: "Images/ProfilePic.jpg" };
        }
        return name;
    });
}

let suggestedFriends = [
    { name: 'Qhugh05', status: 'online', image: 'Images/Football.jpg' },
    { name: 'Sam', status: 'online', image: 'Images/ProfilePic.jpg' },
    { name: 'Jamie', status: 'offline', image: 'Images/ProfilePic.jpg' },
    { name: 'Taylor', status: 'online', image: 'Images/ProfilePic.jpg' }
];

function renderFriends(listToRender) {
    friendsList.innerHTML = "";
    listToRender.forEach(friend => {
        const li = document.createElement("li");
        li.textContent = `${friend.name} (${friend.status})`;
        li.classList.add("friends", friend.status);

        if (friend.page) {
            li.style.cursor = "pointer";
            li.addEventListener("click", () => {
                window.location.href = friend.page;
            });
        }

        friendsList.appendChild(li);
    });
}

function renderSuggested() {
    suggestedList.innerHTML = "";
    suggestedFriends.forEach((friend, index) => {
        const li = document.createElement("li");
        li.classList.add("suggested-friend", friend.status);

        const img = document.createElement("img");
        img.src = friend.image;
        img.alt = `${friend.name} profile picture`;
        img.width = 50;
        img.height = 50;
        img.style.borderRadius = "50%";
        img.style.marginRight = "10px";

        const info = document.createElement("span");
        info.textContent = `${friend.name} (${friend.status})`;

        const button = document.createElement("button");
        button.textContent = "Add Friend";
        button.style.marginLeft = "10px";
        button.addEventListener("click", () => addFriend(index));

        li.appendChild(img);
        li.appendChild(info);
        li.appendChild(button);

        suggestedList.appendChild(li);
    });
}

function addFriend(index) {
    const friend = suggestedFriends[index];
    if (!friend) return;

    friends.push({ ...friend, page: "Friend_Pages/testBlog.html" });
    localStorage.setItem('userFriends', JSON.stringify(friends));
    suggestedFriends.splice(index, 1);
    renderFriends(friends);
    renderSuggested();
}

function setupSearch() {
    searchInput.addEventListener("input", () => {
        const searchVal = searchInput.value.toLowerCase();
        const filtered = friends.filter(f => f.name.toLowerCase().includes(searchVal));
        renderFriends(filtered);
    });
}

renderFriends(friends);
renderSuggested();
setupSearch();
