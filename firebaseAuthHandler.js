
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEY_Ca9XUM3T1fVQE5JOs6WcKdwUFcvmk",
  authDomain: "chatty-a9407.firebaseapp.com",
  databaseURL: "https://chatty-a9407-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatty-a9407",
  storageBucket: "chatty-a9407.appspot.com",
  messagingSenderId: "159299880319",
  appId: "1:159299880319:web:e4b9c1f017c43189f5864a",
  measurementId: "G-N8PK3XWZL1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the auth service
var auth = firebase.auth();

// Function to handle sign in
function signIn(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in successfully
      loggedIn = document.getElementById("loggedIn").value;
      if(loggedIn){
        localStorage.setItem("logged", userCredential)
      }else{
        alert("Hello user, welcome!")
      }
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

function login(){
  mail = document.getElementById("email").value;
  pass = document.getElementById("password").value;
  signIn(mail,pass);
  alert("Done, check firebase!")
}