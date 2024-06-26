let nickname;

if (localStorage.getItem("nickname")) {
  nickname = localStorage.getItem("nickname");
} else {
  nickname = prompt("One Word Nickname: ");
  localStorage.setItem("nickname", nickname);
}

const searchButton = document.getElementById("search");
const closeButton = document.getElementById("close");
const searchDiv = document.querySelector(".search");
const contactsPage = document.querySelector(".contactsPage");

searchButton.onclick = function () {
  closeButton.style.display = 'block';
  this.style.display = 'none';
  searchDiv.style.display = "block";
};

closeButton.onclick = function () {
  this.style.display = 'none';
  searchButton.style.display = 'block';
  searchDiv.style.display = 'none';
};

// Function to create a contact
function createContact(name, email) {
  const contactDiv = document.createElement("div");
  contactDiv.className = "contact";

  const imgDiv = document.createElement("div");
  imgDiv.className = 'img';
  contactDiv.appendChild(imgDiv);

  const nameP = document.createElement("p");
  nameP.className = 'name';
  nameP.innerHTML = name;
  contactDiv.appendChild(nameP);

  const stateP = document.createElement("p");
  stateP.className = 'state';
  stateP.innerHTML = "Offline";
  contactDiv.appendChild(stateP);

  const emailP = document.createElement("p");
  emailP.className = "email";
  emailP.innerHTML = email;
  contactDiv.appendChild(emailP);
  contactsPage.appendChild(contactDiv);

  // Onclick event for the contact
  contactDiv.onclick = function () {
    const nameOfReciever = this.querySelector(".name").innerHTML;
    const emailOfReciever = this.querySelector(".email").innerHTML;
    const stateOfReciever = this.querySelector(".state").innerHTML;
    localStorage.setItem("emailOfReciever", emailOfReciever);
    localStorage.setItem("nameOfReciever", nameOfReciever);
    localStorage.setItem("stateOfReciever", stateOfReciever);
    launchChat();
  };
}

createContact(nickname + " (You)", "alokchoubey892@gmail.com");
createContact("Alok Choubey", "alokchoubey892@gmail.com");
createContact("Trial Bot", "trialperson99@gmail.com");

function launchChat() {
  const chatInterface = document.querySelector(".chatInterface");
  const msgBox = document.querySelector(".msgBox");
  const topnav = document.querySelector(".topnav");
  const stateChat = document.querySelector(".stateChat");
  const nameForChat = document.querySelector(".nameChat");

  contactsPage.style.display = "none";
  topnav.style.display = "none";
  chatInterface.style.display = "block";
  msgBox.style.display = "block";
  nameForChat.innerHTML = localStorage.getItem("nameOfReciever");
  stateChat.innerHTML = localStorage.getItem("stateOfReciever");
  fetchAndDisplayMessages();
}

function revertChat() {
  const chatInterface = document.querySelector(".chatInterface");
  const msgBox = document.querySelector(".msgBox");
  const topnav = document.querySelector(".topnav");
  const stateChat = document.querySelector(".stateChat");
  const nameForChat = document.querySelector(".nameChat");

  contactsPage.style.display = "block";
  topnav.style.display = "block";
  chatInterface.style.display = "none";
  msgBox.style.display = "none";
  clearMessages();
}

// Adding code for searching contacts in the page
const searchInput = document.querySelector('.search');
const suggestionList = document.querySelector('.contactsPage');

const suggestions = ['(You)', 'Alok Choubey', 'Trial Bot'];

searchInput.addEventListener('input', function () {
  const userInput = searchInput.value.toLowerCase();
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(userInput)
  );

  displaySuggestions(filteredSuggestions);
});

function displaySuggestions(suggestions) {
  suggestionList.innerHTML = '';

  suggestions.forEach(suggestion => {
    createContact(suggestion, ''); // Assuming an empty email for the filtered suggestions
  });
}

// Function to clear messages from the display area
function clearMessages() {
  const msgBox = document.querySelector(".msgBox");
  msgBox.innerHTML = ''; // Clears all child elements inside msgBox
}

// Function to fetch and display messages based on sender and receiver names
function fetchAndDisplayMessages() {
  const senderName = localStorage.getItem("mailByAuth");
  const receiverName = localStorage.getItem("emailOfReciever");

  clearMessages(); // Clear existing messages before fetching new ones

  // Get a reference to the database service
  const database = firebase.database();

  // Reference to messages in the database
  const messagesRef = database.ref('messages');

  // Listen for new messages added to the database
  messagesRef.on('child_added', (snapshot) => {
    const messageData = snapshot.val();
    const messageSender = messageData.sender;
    const messageReceiver = messageData.receiver;
    const messageContent = messageData.message;

    // Check if the message matches the sender and receiver
    if (messageSender === senderName && messageReceiver === receiverName) {
      displayMessage(messageContent, 'sent');
    } else if (messageSender === receiverName && messageReceiver === senderName) {
      displayMessage(messageContent, 'received');
    }
  });
}

// Function to display messages in the message box
function displayMessage(messageContent, messageType) {
  const msgBox = document.querySelector(".msgBox");

  const div = document.createElement("div");
  div.textContent = messageContent;
  div.className = messageType;
  msgBox.appendChild(div);
}

// Example usage: Fetch and display messages when the page loads