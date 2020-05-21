const express = require("express")
const path = require("path")
const polygons = require("./data/polygons.json")

const port = process.env.PORT || 3000
const app = express()

app.use(express.static(__dirname + "/dist"))

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"))
})

app.get("/polygon", function (req, res) {
  let randomPolygon = Math.floor(Math.random() * Math.floor(polygons.length))
  // TODO validation
  res.send(polygons[randomPolygon])
})

app.listen(port)
