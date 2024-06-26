
function animateSend() {
  const msg = document.getElementById("msg");
  const msgBox = document.querySelector(".msgBox");

  if (msg.value.trim().length === 0) {
    alert("Nothing to Say!");
    return;
  }

  sendMessage(msg.value); // Pass the message content to sendMessage function
  msg.value = '';
  clear();
  fetchAndDisplayMessages();
}

const firebaseConfig = {
  apiKey: "AIzaSyAf4rYeyqGqPI3rZ1QY8OzHhz92zAMb8gQ",
  authDomain: "chatty-6efc3.firebaseapp.com",
  projectId: "chatty-6efc3",
  storageBucket: "chatty-6efc3.appspot.com",
  messagingSenderId: "141209943511",
  appId: "1:141209943511:web:d74a003b6cdc0436fe9f92",
  measurementId: "G-FV94HMK5VZ"
};

firebase.initializeApp(firebaseConfig);


// Function to send message
function sendMessage(messageContent) {
  var user = firebase.auth().currentUser;
  const senderName = user.email;
  const receiverName = localStorage.getItem("emailOfReciever");

  // Get a reference to the database service
  const database = firebase.database();

  // Push the message to the database
  const messagesRef = database.ref('messages');
  messagesRef.push({
    sender: senderName,
    receiver: receiverName,
    message: messageContent // Use the passed message content here
  });
}

// Function to clear messages from the display area
function clearMessages() {
  const msgBox = document.querySelector(".msgBox");
  msgBox.innerHTML = ''; // Clears all child elements inside msgBox
}

// Function to fetch and display messages based on sender and receiver names
function fetchAndDisplayMessages() {
  const senderName = localStorage.getItem("myemail");
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
