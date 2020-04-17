var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
}

firebase.initializeApp(firebaseConfig);


//logIn Form from DOM

const logInFenster = document.getElementById("loginform");
const logIn = document.getElementById("logIn");


//eventlistener on Login to call function for opening the infowindows 

logIn.addEventListener(`click`, openLogIn) 

//Function for opening infowindows

function openLogIn(e) {
  e.preventDefault();
  logInFenster.style.display = "block";
}



//send logIn Daten to Firestore  & show error message 

const login = (e) =>{
  e.preventDefault();
  const email = document.getElementById("username").value
  const passwort = document.getElementById("password").value

firebase.auth().signInWithEmailAndPassword(email, passwort) 
.then (() => {
   console.log("Success!");
   window.location.href="index_full.html"
})
.catch((error) => {

const message = document.getElementById("errorMessage");
message.innerHTML = "username and password do not match!"

});

}

//eventlistener on Submission 

logInFenster.addEventListener("submit",login)



