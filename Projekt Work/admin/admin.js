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

//post string initieren

const createBlogPost = (post) =>
    `<div class="container mx-auto max-w-sm rounded overflow-hidden shadow-lg justify-center bg-white m-6">
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
 <div class="px-6 py-4">${post.location.city},&nbsp${post.location.country}</div>
 </div>`

 //einfügen von content 

 const content = document.getElementById("content");

 //einfügen von new date

 const date = new Date();


 //erstellen von Array

 const posts =[];

 //db collection 

 db.collection("Posts").get().then((Post) => {
    Post.docs.forEach(doc => {

        const json = doc.data();
        const html = createBlogPost(json);
        const post = document.createElement("div");
        post.innerHTML=html
        content.insertBefore(post, content.firstChild);
        posts.push(post)
    })
})



//getting form from DOM

const form = document.getElementById("newPost");

//saving data

form.addEventListener('submit' , (e) => {
    e.preventDefault();
    db.collection("Posts").add({
        title: newPost.title.value, 
        image: {
            src: newPost.src.value,
            alt: newPost.title.value
        },
        text: newPost.text.value,
        author: newPost.author.value, 
        author_image: newPost.author_image.value,
        date: newPost.date.value,
        location:{ 
            city: newPost.city.value,
            country: newPost.country.value,
            lat: parseFloat(newPost.lat.value),
            lng: parseFloat(newPost.lng.value)
        }

    })
    .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(error => {
        console.error("Error adding document: ", error);
    });
})


