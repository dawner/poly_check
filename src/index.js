import { addressFinder } from "./address_finder.js"

const loadGoogle = () => {
  var script = document.createElement("script")
  script.type = "text/javascript"
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places,geometry`
  script.onload = addressFinder
  document.body.appendChild(script)
}

document.addEventListener("DOMContentLoaded", loadGoogle)
