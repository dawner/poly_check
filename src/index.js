import { addressCheck } from "./address_check.js"

const setup = () => {
  fetch("/polygon")
    .then((response) => response.json())
    .then((polygon) => {
      let mapPolygon = new google.maps.Polygon({
        paths: polygon.coordinates,
        strokeColor: "#FF0000",
        fillColor: "#FF0000",
      })
      let polyBounds = new google.maps.LatLngBounds()
      mapPolygon.getPath().forEach(function (element, index) {
        polyBounds.extend(element)
      })

      let map = new google.maps.Map(document.getElementById("map"), {
        center: polyBounds.getCenter(),
      })

      mapPolygon.setMap(map)

      map.fitBounds(polyBounds)
      map.setZoom()

      addressCheck(map, mapPolygon)
    })
    .catch((error) => {
      console.error("Error fetching polygon:", error)
    })
}

const loadGoogle = () => {
  var script = document.createElement("script")
  script.type = "text/javascript"
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places,geometry`
  script.onload = setup
  document.body.appendChild(script)
}

document.addEventListener("DOMContentLoaded", loadGoogle)
