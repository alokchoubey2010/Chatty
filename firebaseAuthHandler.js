const firebaseConfig = {
  apiKey: "AIzaSyAf4rYeyqGqPI3rZ1QY8OzHhz92zAMb8gQ",
  authDomain: "chatty-6efc3.firebaseapp.com",
  projectId: "chatty-6efc3",
  storageBucket: "chatty-6efc3.appspot.com",
  messagingSenderId: "141209943511",
  appId: "1:141209943511:web:d74a003b6cdc0436fe9f92",
  measurementId: "G-FV94HMK5VZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the auth service
var auth = firebase.auth();

// Function to handle sign up
function signUp(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed up successfully
      var user = userCredential.user;
      console.log("User signed up:", user);
    })
    .catch((error) => {
      // Handle errors here
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Sign up error:", errorMessage);
    });
}

// Function to handle sign in
function signIn(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in successfully
      var user = userCredential.user;
      console.log("User signed in:", user);
    })
    .catch((error) => {
      // Handle errors here
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Sign in error:", errorMessage);
    });
}

// Function to handle sign out
function signOut() {
  auth.signOut()
    .then(() => {
      // Sign-out successful
      console.log("User signed out");
    })
    .catch((error) => {
      // Handle errors here
      console.error("Sign out error:", error);
    });
}


function register(){
  mail = document.getElementById("email").value;
  pass = document.getElementById("password").value;
  signUp(mail,pass)
}


function login(){
  mail = document.getElementById("email").value;
  pass = document.getElementById("password").value;
  signIn(mail,pass)
}

// Check if there is a current user authenticated with Firebase
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in
    var user = firebase.auth().currentUser;
    var userEmailAuth = user.email;
    localStorage.setItem("mailByAuth", userEmailAuth);
    window.location.href = "home.html"; // Replace "url" with your desired redirect URL
  } else {
    // No user is signed in
    console.log("No user is signed in");
    // Optionally, handle this case (e.g., show login form)
  }
});