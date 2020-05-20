export function addressFinder() {
  const input = document.getElementById("searchTextField")
  const resultDisplay = document.getElementById("addressResult")
  const polyCheckDisplay = document.getElementById("polyCheck")

  const options = { types: ["address"] }
  const autocomplete = new google.maps.places.Autocomplete(input, options)

  let coordinates = [
    { lat: -40, lng: 169 },
    { lat: -42, lng: 169 },
    { lat: -42, lng: 179 },
    { lat: -40, lng: 179 },
  ]

  let polygon = new google.maps.Polygon({ paths: coordinates })

  const isInsidePolygon = (lat, lng) => {
    var latLng = new google.maps.LatLng(lat, lng)
    return google.maps.geometry.poly.containsLocation(latLng, polygon)
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
    polyCheckDisplay.innerText = `Which ${isInside ? "IS" : "IS NOT"} inside the polygon`
  }

  autocomplete.addListener("place_changed", updateSelectedPlace)
}
