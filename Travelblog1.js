
const db = firebase.firestore();

//testing the logIn function

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {

    console.log("yes")
    // User is signed in.
  } else {
    // No user is signed in.
    console.log("no")
  }
});

//get map information

let map;
const mapDiv = document.getElementById("map");


//initialize the map 

function initMap() {
  const Rwanda = { lat: -1.940278, lng: 29.87388 };

  map = new google.maps.Map(mapDiv, {
    center: Rwanda,
    zoom: 9,
    styles: [{ "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "labels.text", "stylers": [{ "visibility": "on" }, { "saturation": "-100" }, { "lightness": "65" }, { "gamma": "0.25" }, { "weight": "2.18" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "visibility": "on" }, { "color": "#f3f4f4" }] }, { "featureType": "landscape", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{ "weight": 0.9 }, { "visibility": "off" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.attraction", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#4b8f78" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "color": "#599b7e" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#27863f" }, { "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [{ "visibility": "off" }, { "hue": "#ff0000" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "color": "#599b7e" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "color": "#89c2b0" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }]


  });
}

//get infowindows 

const infowindows = [];

const createInfowindow = (json) =>
  `<div class="container mx-auto max-w-sm rounded overflow-hidden  justify-center bg-teal-800 m-6">
<img class="w-full" src="${json.image.src}" alt="${json.image.alt}">
<div class="px-6 py-4">
  <div class="font-bold text-xl text-white mb-2">${json.title}</div>
  <p class="text-white text-base"> 
  ${json.text}
  </p>
</div>
<div class="px-6 py-4 flex items-center">
  <img class="w-10 h-10 rounded-full mr-4" src="${json.author_image}" alt="${json.author}">
  <div class="text-sm">
    <p class="text-teal-300 leading-none">${json.author}</p>
    <p class="text-teal-300">${json.date}</p>
  </div>
  </div>
 <div class="px-6 py-4 text-white">${json.location.city},&nbsp${json.location.country}</div>
 </div>`

//retrieve data from database for marker & infowindow & add click events

const markers = [];

db.collection("Posts").get().then((Posts) => {
  Posts.docs.forEach(doc => {

    const json = doc.data()

    const image = "https://img.icons8.com/ios-filled/50/000000/marker.png"

    const marker = new google.maps.Marker({
      position: { lat: json.location.lat, lng: json.location.lng },
      title: `${json.title}`,
      map: map,
      icon: image,
      animation: google.maps.Animation.DROP
    });

    markers.push(marker);

    const infowindow = new google.maps.InfoWindow({
      content: createInfowindow(json),
      style: { "background-color": "285e61" }
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

//logout

const logOutButton = document.getElementById("logOut");

const logout = (e) => {

  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
  e.preventDefault();
  window.location.href = "index.html";

}

//eventlistener on logoutButton & logging out

logOutButton.addEventListener('click', logout);
