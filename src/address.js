export function setupAddressChooser(onUpdate) {
  const results = document.getElementById("results")
  const searchField = document.getElementById("searchTextField")
  const resultDisplay = document.getElementById("addressResult")

  const options = { types: ["address"] }
  const autocomplete = new google.maps.places.Autocomplete(searchField, options)

  const updateSelectedPlace = () => {
    let place = autocomplete.getPlace()
    if (!place.geometry) {
      // Invalid place, ignore and wait for valid result
      return
    }

    let loc = place.geometry.location
    let latLng = new google.maps.LatLng(loc.lat(), loc.lng())

    searchField.value = ""
    resultDisplay.innerText = place.formatted_address
    results.style.display = "block"

    onUpdate(latLng)
  }

  autocomplete.addListener("place_changed", updateSelectedPlace)
}
