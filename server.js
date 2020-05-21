const express = require("express")
const path = require("path")
const polygons = require("./data/polygons.json")

const port = process.env.PORT || 3000
const app = express()

const isEqual = (coord1, coord2) => {
  return coord1.lat === coord2.lat && coord1.lng === coord2.lng
}
const randomPolygon = () => {
  let randomNum = Math.floor(Math.random() * Math.floor(polygons.length))
  let polygon = polygons && polygons[randomNum]
  let coordinates = polygon && polygon.coordinates

  if (coordinates.length > 2 && isEqual(coordinates[0], coordinates[coordinates.length - 1])) {
    return polygon
  } else {
    return { error: `Invalid polygon: ${polygon.name}` }
  }
}

app.use(express.static(__dirname + "/dist"))

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"))
})

app.get("/polygon", function (req, res) {
  res.send(randomPolygon())
})

app.listen(port)
