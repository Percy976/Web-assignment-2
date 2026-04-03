let list = document.getElementById("friendsList");
const searchInput = document.getElementById("searchBar")

// Temporary friends list to be replaced with backend stuff
let friends = [
    { name: "Alex", status: "online", page: "Friend_Pages/testBlog.html"},
    { name: "Allen", status: "offline", page: "Friend_Pages/testBlog2.html"}
];

// Runs for each of the friends
friends.forEach(friends => {
    let li = document.createElement("li")

    // Adds the friend's name to the list
    li.textContent = friends.name;

    // Changes the friend's name colour based on their status (green if online, grey if offline)
    li.classList.add("friends", friends.status);

    // Waits for the user to click on a name then sends them to that friend's blog page
    li.addEventListener("click", () => {
        window.location.href = friends.page;
    });

    // Appends the list items (friends) to the friends list
    list.appendChild(li);
});

// Search Bar
searchInput.addEventListener("input", () => {
    // Sets a variable for the value entered into the search bar
    const searchVal = searchInput.value.toLowerCase();

    // Filters all friends for ones matching that of the search bar
    const filteredList = friends.filter(friends => friends.name.toLowerCase().includes(searchVal))

    // Empties the friends list
    list.innerHTML = "";

    // Runs once for all friends who's names are valid with the given search term
    filteredList.forEach(friends => {
        // Sets li as a value to store list items
        let li = document.createElement("li")

        // Adds the friend's name to the list
        li.textContent = friends.name;
        
        // Changes the friend's name colour based on their status (green if online, grey if offline)
        li.classList.add("friends", friends.status);

        
        // Waits for the user to click on a name then sends them to that friend's blog page
        li.addEventListener("click", () => {
            window.location.href = friends.page;
        });

        // Appends the list items (filtered friends) to the friends list
        list.appendChild(li);
    });
})
