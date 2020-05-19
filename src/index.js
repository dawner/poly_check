const initAutocomplete = () => {
  var input = document.getElementById("searchTextField")
  var result = document.getElementById("addressResult")

  autocomplete = new google.maps.places.Autocomplete(input)

  autocomplete.addListener("place_changed", () => {
    let place = autocomplete.getPlace()
    if (!place.geometry) {
      // Invalid place, ignore and wait for valid result
      return
    }

    console.log("You selected: " + place.formatted_address)
    input.value = ""
    result.innerText = `Chosen: ${place.formatted_address}`
  })
}

const loadGoogle = () => {
  var script = document.createElement("script")
  script.type = "text/javascript"
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`
  script.onload = initAutocomplete
  document.body.appendChild(script)
}

document.addEventListener("DOMContentLoaded", loadGoogle)
