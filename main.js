const firebaseConfig = {
  apiKey: "AIzaSyAEY_Ca9XUM3T1fVQE5JOs6WcKdwUFcvmk",
  authDomain: "chatty-a9407.firebaseapp.com",
  databaseURL: "https://chatty-a9407-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatty-a9407",
  storageBucket: "chatty-a9407.appspot.com",
  messagingSenderId: "159299880319",
  appId: "1:159299880319:web:e4b9c1f017c43189f5864a"
};

firebase.initializeApp(firebaseConfig);


function sendMsg(msgValue){
  div = document.createElement("div");
  div.innerHTML = msgValue;
  div.className = "sendDiv";
  document.body.appendChild(div);
}
function send() {
  const msg = document.getElementById("msg");
  if (msg.value === 0) {
    prompt("Nothing to say, send a greeting?");
  } else {
    const username = localStorage.getItem("username");
    sendMsg(username + ": " + msg.value);
    addMessageToFirebase(msg.value);
    msg.value = '';
  }
}

function addMessageToFirebase(message) {
  const username = localStorage.getItem("username");
  const database = firebase.database();
  const category = 'Chatty';
  const categoryRef = database.ref('messages/' + category);
  const newMessageRef = categoryRef.push();
  newMessageRef.set({
    text: message,
    sender: username,
    timestamp: Date.now()
  });
}

// Reference to your Firebase database
const database = firebase.database();
// Reference to the messages category in your database
const categoryRef = database.ref('messages/Chatty');
// Function to display messages
function displayMessages() {
  categoryRef.on('value', function(snapshot) {
    // Iterate through each message in the snapshot
    snapshot.forEach(function(childSnapshot) {
      // Get the message data
      const messageData = childSnapshot.val();

      // Create a div element to display the message
      const messageDiv = document.createElement("div");
      messageDiv.innerText = messageData.sender + ": " + messageData.text;

      // Create a delete button
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", function() {
        // Get the message key and remove it from the database
        const messageKey = childSnapshot.key;
        categoryRef.child(messageKey).remove();
      });

      // Append the message and delete button to the messages container
      messageDiv.appendChild(deleteButton);
      document.body.appendChild(messageDiv);
    });
  });
}

// Call the displayMessages function to initially display any existing messages
displayMessages();