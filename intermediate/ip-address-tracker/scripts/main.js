const form = document.getElementById('form')
form.addEventListener('submit', getIPDetails);

let ipAddressField = document.querySelector('.ip-address')
let locationField = document.querySelector('.location')
let timezone = document.querySelector('.timezone')
let isp = document.querySelector('.isp')
let notFound = document.querySelector('.not-found')

let mapLat = ''
let mapLng = ''

// map
let map = L.map('map', { zoomControl: false, attributionControl: false });
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  zoomControl: false,
  // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function getIPDetails(event) {
    console.log('event', event)
    if (event !== undefined) event.preventDefault()

    let ipAddress = document.getElementById('searchInput').value;
    console.log('ipAddress', ipAddress)

    try {
      const response = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_IYjEmNhOG6PVVtZnbpWeeE0raZUS7&ipAddress=${ipAddress}&domain=${ipAddress}`).then(data => data.json())
      console.log('response', response, response.location)

      notFound.classList.add('d-none')
      ipAddressField.innerHTML = response.ip
      document.getElementById('searchInput').value = ''
      locationField.innerHTML = `${response.location.city}, ${response.location.country} <br> ${response.location.postalCode}`
      timezone.innerHTML = `UTC ${response.location.timezone}`
      isp.innerHTML = response.isp

      mapLat = response.location.lat
      mapLng = response.location.lng

      // map icon
      const greenIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        // shadowUrl: 'leaf-shadow.png',

        iconSize: [46, 56], // size of the icon
        // shadowSize: [50, 64], // size of the shadow
        // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        // popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
      map.setView([mapLat, mapLng], 13);
      let mapMarker  = L.marker([mapLat, mapLng], { icon: greenIcon }).addTo(map);
    } catch (error) {
      console.log(error)
      // alert(error)
      ipAddressField.innerHTML = ''
      document.getElementById('searchInput').value = ''
      locationField.innerHTML = ''
      timezone.innerHTML = 'UTC'
      isp.innerHTML = ''
      notFound.classList.remove('d-none')
    }
}

getIPDetails()
// 192.212.174.101

// popup
// let popup = L.popup();
// let mapMarker = {}

// function onMapClick(e) {
//   console.log('clicked:', e, e.latlng)
//   if (mapMarker != undefined) {
//     map.removeLayer(mapMarker);
//   };
//   mapLat = e.latlng.lat
//   mapLng = e.latlng.lng
//   mapMarker = L.marker([mapLat, mapLng], { icon: greenIcon }).addTo(map);

//   popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at " + e.latlng.toString())
//     .openOn(map);
// }

// map.on('click', onMapClick);
// }
