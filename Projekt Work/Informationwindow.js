let map;
const mapDiv = document.getElementById("map");

const places = [
  {
    title: "Godafoss Waterfalls, Iceland",
    image: {
      src: "img/06Godafoss_Iceland800.jpg",
      alt: "Godafoss waterfalls in Iceland"
    },
    text: "Running, running, falling. Nothing, everything changes.",
    author: "Gundarik Icetrollson",
    author_image: "img/icon_icetroll.jpg",
    date: "Dec 18, 1820",
    location: "Godafoss Waterfalls, Iceland",
    location: {
      city: "Laugar",
      country: "Iceland",
      lat: 65.674663968,
      lng: -17.537331184
    }
  },
  {
    title: "The Golden City of Prague",
    image: {
      src: "img/09Prague800.jpg",
      alt: "Prague, the Golden City"
    },
    text: "City of old, alchemists, crazy kings, dumplings and sauerkraut.",
    author: "Karel",
    author_image: "img/icon_krtek.png",
    date: "Feb 28, 2020",
    location: "Prague, Czech Republic",
    location: {
      city: "Prague",
      country: "Czech Republik",
      lat: 50.073658,
      lng: 14.41854
    }
  },
  {
    title: "Old Paria, Utah",
    image: {
      src: "img/11Old_Paria_Utah_USA800.jpg",
      alt: "Old Paria in Utah, USA"
    },
    text:
      "The side of the mountains have spectacular colors due to their encrusted minerals like iron oxides, manganese, cobalt and others that geologists describe.",
    author: "Wild Bill",
    author_image: "img/icon_cowboy.jpg",
    date: "Jan 18, 2020",
    location: {
      city: "Kanab",
      country: "USA",
      lat: 37.034666528,
      lng: -112.525331232
    }
  },
  {
    title: "Peyto Lake Mountains, Canada",
    image: {
      src: "img/15Peyto_Lake_Mountains_Canada800.jpg",
      alt: "Peyto Lake Mountains in Canada"
    },
    text:
      "Energize! Where is Ryker? Make it so. Battle stations. Leave the bridge. One plum juice pleace.",
    author: "Wolpertinger",
    author_image: "img/icon_Wolpertinger.jpg",
    date: "March 9, 2020",
    location: "Peyto Lake Mountains, Canada",
    location: {
      city: "Peyto",
      country: "Canada",
      lat: 51.725515,
      lng: -116.522698
    }
  },
  {
    title: "Uluru, the Sleeping Heart of Australia",
    image: {
      src: "img/22uluru800.jpg",
      alt: "Uluru"
    },
    text:
      "Stuck in Dream Time! There is no such thing. Turn around to Uluru. Get back.",
    author: "Wild Bill",
    author_image: "img/icon_cowboy.jpg",
    date: "March 9, 2020",
    location: {
      city: "Alice Springs",
      country: "Australia",
      lat: -25.344,
      lng: 131.036
    }
  }
];

const infoWindows = [];

const closeInfoWindows = () => {
	for (let i = 0; i < infoWindows.length; i++) {
		const infoWindow = infoWindows[i];
		infoWindow.close();
  }
};

const createHtml = onePlace => {
  const html = `<img class="w-64" src="${onePlace.image ? onePlace.image.src : ""}" alt="${onePlace.image ? onePlace.image.alt : ""}">
  <div class="px-6 py-4 box-border w-64">
    <div class="font-bold text-xl mb-2">${onePlace.title}</div>
    <p class="text-gray-700 text-base">
      ${onePlace.text}
    </p>
  </div>
  <div class="px-6 py-4 flex items-center w-64 box-border">
    <img class="w-10 h-10 rounded-full mr-4" src="${onePlace.author_image ? onePlace.author_image : ""}" alt="${onePlace.author ? onePlace.author : ""}">
    <div class="text-sm">
      <p class="text-gray-900 leading-none">${onePlace.author}</p>
      <p class="text-gray-600">${onePlace.date.toDate ? onePlace.date.toDate().toDateString() : onePlace.date}</p>
    </div>
  </div>
  <div class="px-6 py-4">${onePlace.location.city}, ${onePlace.location.country}</div>`
  return html;
}

const getPosition = place => {
  return { lat: place.location.lat, lng: place.location.lng };
};

function initMap() {
  const hamburg = { lat: 53.55618, lng: 9.92557 };

  map = new google.maps.Map(mapDiv, {
    center: {lat: 0, lng: 0},
    zoom: 2
  });

  for (let i = 0; i < places.length; i++) {
    const marker = new google.maps.Marker({
      position: { lat: places[i].location.lat, lng: places[i].location.lng },
      map: map,
      title: `${places[i].title}`
    });
     marker.addListener("click", () => {
     closeInfoWindows();        
    infowindow.open(map, marker);
    map.setZoom(5);
    map.setCenter(marker.getPosition());
    });
    map.addListener("click", () => {
      closeInfoWindows();        
      map.setZoom(2);
      map.setCenter({lat: 0, lng: 0});
    });
    const infowindow = new google.maps.InfoWindow({
      content: createHtml(places[i])
    });
    infoWindows[i] = infowindow;
  }
}
