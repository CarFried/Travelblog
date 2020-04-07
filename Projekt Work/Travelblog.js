let map;
const mapDiv = document.getElementById("map");

const posts = [
  {
    title: "Akagera National Park",
    image: {
      src: "img/Akagera National Park Kopie.jpg",
      alt: "Sunset in the mountains"
    },
    text: "Der Akagera-Nationalpark befindet sich im Osten des zentralafrikanischen Staates Ruanda an der Grenze zu Tansania, südlich des sogenannten „Nordknies“ des Akagera.",
    author: "Carlotta Friedmann",
    author_image: "img/Monster test.png",
    date: "Jan 18, 2020",
    location: {
      city: "Akagera National Park",
      country: "Rwanda",
      lat: -1.879612,
      lng: 30.70402,

    }
  },
  {
    title: "Kigali",
    image: {
      src: "img/Kigali Kopie.jpg",
      alt: "Sunset in the mountains"
    },
    text: "Kigali ist die Hauptstadt Ruandas. Sie liegt ungefähr in der Mitte des Landes und erstreckt sich über mehrere Hügel, Grate und Täler. Die Stadt bietet eine lebhafte Restaurantszene und ein reges Nachtleben.",
    author: "Carlotta Friedmann",
    author_image: "img/Monster test.png",
    date: "Jan 18, 2020",
    location: {
      city: "Kigali",
      country: "Rwanda",
      lat: -1.94995,
      lng: 30.05885,
    }
  },
  {
    title: "lake kivu",
    image: {
      src: "img/lake-kivu Kopie.jpg",
      alt: "Sunset in the mountains"
    },
    text: "Der Kiwusee oder Kivusee ist ein See in Zentralafrika. Durch ihn verläuft die Grenze zwischen Ruanda und der Demokratischen Republik Kongo..",
    author: "Carlotta Friedmann",
    author_image: "img/Monster test.png",
    date: "Jan 18, 2020",
    location: {
      city: "lake kivu",
      country: "Rwanda",
      lat: -2.044843,
      lng: 29.185579,

    }
  },
  {
    title: "Rusizi",
    image: {
      src: "img/Rusizi Kopie.jpg",
      alt: "Sunset in the mountains"
    },
    text: "Rusizi, in der Nähe von Lake Kivu ist bevölkert von Fischern. Der See ist die Lebensader der Stadt.",
    author: "Carlotta Friedmann",
    author_image: "img/Monster test.png",
    date: "Jan 18, 2020",
    location: {
      city: "Rusizi",
      country: "Rwanda",
      lat: -2.53027,
      lng: 28.9075

    }
  },
  {
    title: "Ngoma",
    image: {
      src: "img/Ngoma Kopie.jpg",
      alt: "Sunset in the mountains"
    },
    text: "Ngoma ist sein geeignetes Ziel für relaxte Tage im Hinterland von Ruanda.",
    author: "Carlotta Friedmann",
    author_image: "img/Monster test.png",
    date: "Jan 18, 2020",
    location: {
      city: "Ngoma",
      country: "Rwanda",
      lat: -2.543966,
      lng: 29.768661,

    }

  },
  {
    title: "Nyanza",
    image: {
      src: "img/Nyanza Kopie.jpg",
      alt: "Sunset in the mountains"
    },
    text: "Nyanza bedeutet in der Sprache der im angrenzenden Tansania lebenden Sukuma „große Wassermasse.",
    author: "Carlotta Friedmann",
    author_image: "img/Monster test.png",
    date: "Jan 18, 2020",
    location: {
      city: "Nyanza",
      country: "Rwanda",
      lat: -2.35187,
      lng: 29.75089,

    }


  },
  {
    title: "Nyungwe National Park",
    image: {
      src: "img/Nyungwe National Park Kopie.jpg",
      alt: "Sunset in the mountains"
    },
    text: "Der Nyungwe-Wald ist ein immergrüner Bergregenwald im Südwesten Ruandas und gilt als der größte zusammenhängende Bergwald in Ost- und Zentralafrika.",
    author: "Carlotta Friedmann",
    author_image: "img/Monster test.png",
    date: "Jan 18, 2020",
    location: {
      city: "Nyungwe National Park",
      country: "Rwanda",
      lat: -2.527976,
      lng: 29.278564,

    }
  },
  {
    title: "Volcano National Park",
    image: {
      src: "img/Volcano National Park Kopie.jpg",
      alt: "Sunset in the mountains"
    },
    text: "Der Vulkan-Nationalpark ist ein etwa 13.000 Hektar großer Nationalpark im Nordwesten Ruandas.",
    author: "Carlotta Friedmann",
    author_image: "img/Monster test.png",
    date: "Jan 18, 2020",
    location: {
      city: "Volcano National Park",
      country: "Rwanda",
      lat: -1.432074,
      lng: 29.566613

    }

  },

]

const createInfowindow = (posts) =>
  `<div class="container mx-auto max-w-sm rounded overflow-hidden  justify-center bg-white m-6">
<img class="w-full" src="${posts.image.src}" alt="${posts.image.alt}">
<div class="px-6 py-4">
  <div class="font-bold text-xl mb-2">${posts.title}</div>
  <p class="text-gray-700 text-base"> 
  ${posts.text}
  </p>
</div>
<div class="px-6 py-4 flex items-center">
  <img class="w-10 h-10 rounded-full mr-4" src="${posts.author_image}" alt="${posts.author}">
  <div class="text-sm">
    <p class="text-gray-900 leading-none">${posts.author}</p>
    <p class="text-gray-600">${posts.date}</p>
  </div>
  </div>
 <div class="px-6 py-4">${posts.location.city},&nbsp${posts.location.country}</div>
 </div>`

const infowindow = [];


function initMap() {
  const Rwanda = { lat: -1.940278, lng: 29.87388 };

  map = new google.maps.Map(mapDiv, {
    center: Rwanda,
    zoom: 9
  });

  for (let i = 0; i < posts.length; i++) {
    const marker = new google.maps.Marker({
      position: { lat: posts[i].location.lat, lng: posts[i].location.lng },
      title: `${posts[i].title}`,
      map: map,
      animation: google.maps.Animation.DROP
    });
    const infowindow = new google.maps.InfoWindow({
      content: createInfowindow(posts[i])
    });
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
  }
}


