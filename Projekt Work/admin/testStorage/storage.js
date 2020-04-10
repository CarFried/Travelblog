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

//get button and input field 

const pictureUpload = document.getElementById("fileUpload");
const uploadButton = document.getElementById("buttonUp");

let selectedFile;


function uploadFile() {

    //get reference (where to store at FB)
    const storageRef = firebase.storage().ref('/travelpictures/');

    //get filename
    const filenName = selectefile.name;

    //get reference to file 
    const fileRef = storageRef.child(fileName);

}




const upload = (e) => {

    e.preventDefault();
    //get reference (where to store at FB)
    const ref = firebase.storage().ref('/travelpictures/');
    //get filename
    selectedFile = e.target.files[0];
    //get reference to file 
    const fileRef = storageRef.child(fileName);
    //get metadata 
    const metadata = {
        contentType: 'image/jpeg'
    };
    const task = storageRef.put(selectedFile)
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
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
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
            });
        });
}

uploadButton.addEventListener('upload', upload);


//     const task = ref.child(name).put(file,metadata);
//     task
//     .then(snapshot => snapshot.ref.getDownloadURL())
//     .then((url) => {
//         console.log(url); 

//     })
//     .catch(console.error)


// }

























