export function addressFinder() {
  const input = document.getElementById("searchTextField")
  const resultDisplay = document.getElementById("addressResult")

  const options = { types: ["address"] }
  const autocomplete = new google.maps.places.Autocomplete(input, options)

  let chosenLocation = null
  const updateSelectedPlace = () => {
    let place = autocomplete.getPlace()
    if (!place.geometry) {
      // Invalid place, ignore and wait for valid result
      return
    }

    chosenLocation = place.geometry.location
    console.log(
      `You selected: ${chosenLocation.lat()}, ${chosenLocation.lng()}`
    )

    input.value == ""
    resultDisplay.innerText = `Chosen: ${place.formatted_address}`
  }

  autocomplete.addListener("place_changed", updateSelectedPlace)
}
