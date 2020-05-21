export function addressCheck(map, mapPolygon) {
  const input = document.getElementById("searchTextField")
  const resultDisplay = document.getElementById("addressResult")
  const polyCheckDisplay = document.getElementById("polyCheck")
  polyCheckDisplay.innerText = `Search for an address to see if it's inside the polygon: ${mapPolygon.name}`

  const options = { types: ["address"] }
  const autocomplete = new google.maps.places.Autocomplete(input, options)
  let marker = null

  const isInsidePolygon = (latLng) => {
    return google.maps.geometry.poly.containsLocation(latLng, mapPolygon)
  }

  const updateSelectedPlace = () => {
    let place = autocomplete.getPlace()
    if (!place.geometry) {
      // Invalid place, ignore and wait for valid result
      return
    }

    let loc = place.geometry.location
    let latLng = new google.maps.LatLng(loc.lat(), loc.lng())

    let isInside = isInsidePolygon(latLng)

    marker && marker.setMap(null) // remove any old marker
    marker = new google.maps.Marker({ position: latLng, map: map })
    map.setCenter(latLng)

    console.log(`You selected: ${loc.lat()}, ${loc.lng()}`)

    input.value == ""
    resultDisplay.innerText = `Chosen: ${place.formatted_address}`
    polyCheckDisplay.innerText = `Which ${isInside ? "IS" : "IS NOT"} inside the polygon: ${mapPolygon.name}`
  }

  autocomplete.addListener("place_changed", updateSelectedPlace)
}
