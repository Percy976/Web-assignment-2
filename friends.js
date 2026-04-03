const friendsList = document.getElementById("friendsList");
const suggestedList = document.getElementById("suggestedList");
const searchInput = document.getElementById("searchBar");

let friends = [
    { name: "Alex", status: "online", page: "Friend_Pages/testBlog.html" },
    { name: "Allen", status: "offline", page: "Friend_Pages/testBlog2.html" }
];

let suggestedFriends = [
    { name: "Sam", status: "online", image: "Images/ProfilePic.jpg" },
    { name: "Jamie", status: "offline", image: "Images/ProfilePic.jpg" },
    { name: "Taylor", status: "online", image: "Images/ProfilePic.jpg" }
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
