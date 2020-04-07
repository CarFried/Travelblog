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

//get map information

let map;
const mapDiv = document.getElementById("map");


//initialize the map 

function initMap() {
    const Rwanda = { lat: -1.940278, lng: 29.87388 };

    map = new google.maps.Map(mapDiv, {
        center: Rwanda,
        zoom: 9
    });
}

//get infowindows 

const infowindows = [];

const createInfowindow = (json) =>
    `<div class="container mx-auto max-w-sm rounded overflow-hidden  justify-center bg-white m-6">
<img class="w-full" src="${json.image.src}" alt="${json.image.alt}">
<div class="px-6 py-4">
  <div class="font-bold text-xl mb-2">${json.title}</div>
  <p class="text-gray-700 text-base"> 
  ${json.text}
  </p>
</div>
<div class="px-6 py-4 flex items-center">
  <img class="w-10 h-10 rounded-full mr-4" src="${json.author_image}" alt="${json.author}">
  <div class="text-sm">
    <p class="text-gray-900 leading-none">${json.author}</p>
    <p class="text-gray-600">${json.date}</p>
  </div>
  </div>
 <div class="px-6 py-4">${json.location.city},&nbsp${json.location.country}</div>
 </div>`

//retrieve data from database for marker & infowindow & add click events

const markers = [];

db.collection("Posts").get().then((Posts) => {
    Posts.docs.forEach(doc => {

        const json = doc.data()

        const marker = new google.maps.Marker({
            position: { lat: json.location.lat, lng: json.location.lng },
            title: `${json.title}`,
            map: map,
            animation: google.maps.Animation.DROP
        });
    
        markers.push(marker);

        const infowindow = new google.maps.InfoWindow({
            content: createInfowindow(json)
        });
        
        infowindows.push(infowindow);

        marker.addListener('click', () => {
            infowindow.open(map, marker);
            map.setZoom(12);
            map.setCenter({ lat: 0, lng: 0 });
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(google.maps.Animation.BOUNCE);
            }
          })
          infowindow.addListener(`closeclick`, () => {
            infowindow.close()
            marker.setAnimation(null);
            map.setCenter({ lat: -1.940278, lng: 29.87388 })
            map.setZoom(9)
          });
    })

})


// //event.listener marker

// for(let i=0; i<markers.length; i++) {
//     markers[i].addListener('click', () => {
//         infowindows[i].open(map, marker);
//         map.setZoom(12);
//         map.setCenter({ lat: 0, lng: 0 });
//         if (markers[i].getAnimation() !== null) {
//           markers[i].setAnimation(null);
//         } else {
//           markers[i].setAnimation(google.maps.Animation.BOUNCE);
//         }
//       })

// //       console.log(markers[1])
// }




// marker.addListener('click', () => {
//     infowindow.open(map, marker);
//     map.setZoom(12);
//     map.setCenter({ lat: 0, lng: 0 });
//     if (marker.getAnimation() !== null) {
//       marker.setAnimation(null);
//     } else {
//       marker.setAnimation(google.maps.Animation.BOUNCE);
//     }
//   })

