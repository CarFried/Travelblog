var firebaseConfig = {
    apiKey: "AIzaSyBuZ4CU0kUfI3V8r_kCIXUPaBdsmKu3TN4",
    authDomain: "travelblog-e6430.firebaseapp.com",
    databaseURL: "https://travelblog-e6430.firebaseio.com",
    projectId: "travelblog-e6430",
    storageBucket: "travelblog-e6430.appspot.com",
    messagingSenderId: "24615620847",
    appId: "1:24615620847:web:5fe6291c80cefcc69e8b1a"
}

firebase.initializeApp(firebaseConfig);

const dblimited = firebase.firestore();

//logIn Form holen

const logInFenster = document.getElementById("loginform");
const logIn = document.getElementById("logIn");


//eventlistener auf Login setzen und Funktion zum Öffnen aufrufen

logIn.addEventListener(`click`, openLogIn) 

//Funktion um Infowindow zu öffnen

function openLogIn(e) {
  e.preventDefault();
  logInFenster.style.display = "block";
}

//logIn Daten zum Firestore senden & error message displayen 




const login = (e) =>{
  e.preventDefault();
  const email = document.getElementById("username").value
  const passwort = document.getElementById("password").value

firebase.auth().signInWithEmailAndPassword(email, passwort) 
.then (() => {
   console.log("Success!");
   window.location.href="Travelblog.html"
})
.catch((error) => {

const message = document.getElementById("errorMessage");
message.innerHTML = "username and password do not match!"

});

}

//eventlistener auf Submission senden

logInFenster.addEventListener("submit",login)



