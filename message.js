const currentUsername = 'Qhugh05';
const friendsMessageList = document.getElementById('friendsMessageList');
const chatWithHeading = document.getElementById('chatWithHeading');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

let selectedFriend = null;

function getAcceptedUsers() {
    const acceptedLogins = JSON.parse(localStorage.getItem('acceptedLogins')) || {};
    return Object.keys(acceptedLogins).filter(u => u !== currentUsername);
}

function getMessages() {
    return JSON.parse(localStorage.getItem('messages')) || {};
}

function saveMessages(messages) {
    localStorage.setItem('messages', JSON.stringify(messages));
}

function conversationId(userA, userB) {
    return [userA, userB].sort().join('-');
}

function renderFriendList() {
    const friends = getAcceptedUsers();
    friendsMessageList.innerHTML = '';

    if (friends.length === 0) {
        const none = document.createElement('li');
        none.textContent = 'No friends available';
        friendsMessageList.appendChild(none);
        return;
    }

    friends.forEach(friend => {
        const li = document.createElement('li');
        li.textContent = friend;
        li.className = 'friend-item';
        li.addEventListener('click', () => selectFriend(friend));
        friendsMessageList.appendChild(li);
    });
}

function renderConversation() {
    chatMessages.innerHTML = '';

    if (!selectedFriend) return;

    const messages = getMessages();
    const key = conversationId(currentUsername, selectedFriend);
    const convo = messages[key] || [];

    convo.forEach(item => {
        const msgDiv = document.createElement('div');
        msgDiv.className = item.sender === currentUsername ? 'message outgoing' : 'message incoming';
        msgDiv.textContent = item.text;
        chatMessages.appendChild(msgDiv);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function selectFriend(friend) {
    selectedFriend = friend;
    chatWithHeading.textContent = `Chat with ${friend}`;
    chatInput.disabled = false;
    sendBtn.disabled = false;
    renderConversation();
}

function sendMessage() {
    if (!selectedFriend) return;

    const text = chatInput.value.trim();
    if (!text) return;

    const messages = getMessages();
    const key = conversationId(currentUsername, selectedFriend);

    if (!messages[key]) messages[key] = [];
    messages[key].push({ sender: currentUsername, text, timestamp: new Date().toISOString() });

    saveMessages(messages);
    chatInput.value = '';
    renderConversation();
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

renderFriendList();
