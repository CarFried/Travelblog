//initialize Database

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

const db = firebase.firestore();

//get form and LogIn Fenster from DOM

const logInFenster = document.getElementById("loginform");
const content = document.getElementById("content");
const form = document.getElementById("Post");



//Authentification and display of login window
var user = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("signed in")
  } else {
    console.log("signed out")
    logInFenster.style.display = "block";
    content.style.display = "none";
    form.style.display = "none";
  }
});


//User LogIn 
const login = (e) => {
  e.preventDefault();
  const email = document.getElementById("username").value
  const passwort = document.getElementById("password").value

  firebase.auth().signInWithEmailAndPassword(email, passwort)
    .then(() => {
      console.log("Success!");
      window.location.href = "admin.html"
    })
    .catch((error) => {

      const message = document.getElementById("errorMessage");
      message.innerHTML = "username and password do not match!"

    });

}

//eventlistener on Submission 

logInFenster.addEventListener("submit", login)


//post string initieren

const createBlogPost = (post) =>
  `<div id= "Template" class="container mx-auto max-w-sm rounded overflow-hidden shadow-lg justify-center bg-white m-6">
 <img class="w-full" src="${post.image.src}" alt="${post.image.alt}">
<div class="px-6 py-4">
  <div class="font-bold text-xl mb-2">${post.title}</div>
  <p class="text-gray-700 text-base"> 
  ${post.text}
  </p>
</div>
<div class="px-6 py-4 flex items-center">
  <img class="w-10 h-10 rounded-full mr-4" src="${post.author_image}" alt="${post.author}">
  <div class="text-sm">
    <p class="text-gray-900 leading-none">${post.author}</p>
    <p class="text-gray-600">${post.date.toDate ? post.date.toDate().toDateString() : post.date}</p>
  </div>
 <div class="px-6 py-4">${post.location.city},&nbsp${post.location.country} </div>
 <img id="edit" title="edit Blogpost" class="w-4 mr-2" src="https://img.icons8.com/android/24/000000/ball-point-pen.png"/>
 </div>`

//form string -> relevant for edit Post function 

const createForm = (post) => 

`<form id="newPost" action="submit">
<div id="Formular" class="container mx-auto max-w-sm rounded overflow-hidden shadow-lg justify-center bg-white m-10">
    <form class="w-full max-w-sm p-5">
      <div class="md:flex md:items-center my-6">
        <div class="md:w-1/3">
          <label  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="title">
         Titel
          </label>
        </div>
        <div class="md:w-2/4">
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="title" type="text" placeholder="${post.title}">
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="src">
         Travel Image 
          </label>
        </div>
        <div class="md:w-2/4">
          <input class="bg-gray-200 appearance-none button-border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-200  leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="src" type="file" placeholder=" ${post.image.src}">
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="text">
         Text
          </label>
        </div>
        <div class="md:w-2/4">
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="text" type="text" placeholder=" ${post.text}">
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="author">
         Author
          </label>
        </div>
        <div class="md:w-2/4">
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight " id="author" type="text" placeholder="Carlotta Friedmann"readonly>
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="author_image">
          Author Image
          </label>
        </div>
        <div class="md:w-2/4">
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight " id="author_image" type="text" placeholder="img/Monster test.png" readonly>
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="date">
          Date
          </label>
        </div>
        <div class="md:w-2/4">
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="date" type="text" placeholder="${post.date}">
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label id ="city" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="city">
          City
          </label>
        </div>
        <div class="md:w-2/4">
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="city" type="text" placeholder="${post.location.city}">
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label id="country" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="country">
         Country
          </label>
        </div>
        <div class="md:w-2/4">
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="country" type="text" placeholder="${post.location.country}">
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label id="latitude" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="lat">
         Latitude
          </label>
        </div>
        <div class="md:w-2/4">
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="lat" type="number" placeholder="${post.location.lat}" step="0.0000001">
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label id="Longitude" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="lng">
        Longitude
          </label>
        </div>
        <div class="md:w-2/4">
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="lng" type="number" placeholder="${post.location.lng}"step="0.0000001">
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button class="shadow bg-teal-600 hover:bg-teal-400	 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mb-6" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
  </div>
</form>`


//get doc ref 

// const findDoc = (e) => {

//   db.collection("Posts").get()
//   .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           const json = doc.data();
//           const id = doc.id
//           if(e.target.closest("#Template")){
//             console.log(id)
//           }
//           else{
//             console.log("no id")

//           }
//       });
//     });
    
// }


//db collection - create new Blogpost and new Form to attach to each Blogpost 

db.collection("Posts").get().then((Post) => {
  Post.docs.forEach(doc => {

    const json = doc.data();
    const html = createBlogPost(json);
    const post = document.createElement("div");
    post.innerHTML = html
    post.querySelector("#edit").addEventListener('click', editPost)
    content.insertBefore(post, content.firstChild);
    const form = document.createElement("div"); 
    form.innerHTML = createForm (json); 
    form.querySelector("#newPost").addEventListener('click', closeForm)
    post.append(form)
    form.style.display= "none";
  })


})

//function for editing blogpost and display 

const editPost = (e) => {

  console.log(e)

  const Postedit = e.target.closest("#Template").nextSibling

  Postedit.style.display ="block"

}

//function for closing of form

const closeForm = (e) =>{

  const closeForm = e.target.closest("#newPost")

  closeForm.style.display ="none"

}




//Uploading Pictures

//getting relevant Input Variable from the DOM 

const pictureUpload = document.getElementById("src");

//getting Object

let file;
pictureUpload.addEventListener('change', (e) => {
  file = e.target.files[0];
});


//Variable for download URL

let URL;


//Function for uploading images 

const upload = (e) => {

  e.preventDefault();


  //get reference (where to store at FB)
  const ref = firebase.storage().ref('/travelpictures/');
  //get reference to file 
  const fileRef = ref.child(file.name);
  //get metadata 
  const metadata = {
    contentType: 'image/jpeg'
  };
  const task = fileRef.put(file, metadata)
  // Listen for state changes, errors, and completion of the upload.
  task.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function (snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function (error) {

      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, function () {
      // Upload completed successfully, now we can get the download URL
      task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        URL = downloadURL
  

       //saving data of form by submitting it to firestore
        db.collection("Posts").add({
          title: Post.title.value,
          image: {
            src: URL,
            alt: Post.title.value
          },
          text: Post.text.value,
          author: "Carlotta Friedmann",
          author_image: "img/Monster test.png",
          date: Post.date.value,
          location: {
            city: Post.city.value,
            country: Post.country.value,
            lat: parseFloat(Post.lat.value),
            lng: parseFloat(Post.lng.value)
          }

        })
          .then(docRef => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(error => {
            console.error("Error adding document: ", error);
          })
      })

    });
};



form.addEventListener('submit', upload);







  

//relevant for edit Posts, still in development

// // const resetPost = (e) => {



// db.collection("Posts").doc().update({
//     title: true,
//     image: {
//         src: true,
//         alt: true
//     },
//     text: true,
//     author:true,
//     author_image: true,
//     date: true,
//     location:{ 
//         city: true,
//         country: true,
//         lat: parseFloat(true),
//         lng: parseFloat(true)
//     } 
// });




// //     icon.addEventListener('click', resetPost)

// // }