import { addressCheck } from "./address_check.js"

const setup = () => {
  fetch("/polygon")
    .then((response) => response.json())
    .then((data) => {
      addressCheck(data)
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
