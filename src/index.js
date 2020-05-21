import { setupAddressChooser } from "./address.js"
import { Polygon } from "./polygon.js"

const setupMap = (data) => {
  document.getElementById("polygonName").innerText = data.name
  const resultDisplay = document.getElementById("polygonAnswer")

  const options = { zoom: 4, center: { lat: 49.2827, lng: -123.1207 } }
  const map = new google.maps.Map(document.getElementById("map"), options)

  const polygon = Polygon(map, data.coordinates)
  let marker = null

  const onAddressUpdate = (latLng) => {
    map.setCenter(latLng)
    marker && marker.setMap(null) // remove any old marker
    marker = new google.maps.Marker({ position: latLng, map: map })

    let isInside = polygon.containsPoint(latLng)
    resultDisplay.innerText = isInside
  }

  setupAddressChooser(onAddressUpdate)
}

const init = () => {
  fetch("/polygon")
    .then((response) => response.json())
    .then((data) => {
      setupMap(data)
    })
    .catch((error) => {
      console.error("Error fetching polygon:", error)
    })
}

const loadGoogle = () => {
  const script = document.createElement("script")
  script.type = "text/javascript"
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places,geometry`
  script.onload = init
  document.body.appendChild(script)
}

document.addEventListener("DOMContentLoaded", loadGoogle)
