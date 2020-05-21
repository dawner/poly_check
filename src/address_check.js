export function addressCheck(polygon) {
  const input = document.getElementById("searchTextField")
  const resultDisplay = document.getElementById("addressResult")
  const polyCheckDisplay = document.getElementById("polyCheck")
  polyCheckDisplay.innerText = `Search for an address to see if it's inside the polygon: ${polygon.name}`

  const options = { types: ["address"] }
  const autocomplete = new google.maps.places.Autocomplete(input, options)

  let mapPolygon = new google.maps.Polygon({ paths: polygon.coordinates })

  const isInsidePolygon = (lat, lng) => {
    let latLng = new google.maps.LatLng(lat, lng)
    return google.maps.geometry.poly.containsLocation(latLng, mapPolygon)
  }

  const updateSelectedPlace = () => {
    let place = autocomplete.getPlace()
    if (!place.geometry) {
      // Invalid place, ignore and wait for valid result
      return
    }

    let loc = place.geometry.location
    let isInside = isInsidePolygon(loc.lat(), loc.lng())

    console.log(`You selected: ${loc.lat()}, ${loc.lng()}`)

    input.value == ""
    resultDisplay.innerText = `Chosen: ${place.formatted_address}`
    polyCheckDisplay.innerText = `Which ${isInside ? "IS" : "IS NOT"} inside the polygon: ${polygon.name}`
  }

  autocomplete.addListener("place_changed", updateSelectedPlace)
}
