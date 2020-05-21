export const Polygon = (map, coordinates) => {
  const polygon = new google.maps.Polygon({
    path: coordinates,
    strokeColor: "#FF0000",
    fillColor: "#FF0000",
  })

  let polyBounds = new google.maps.LatLngBounds()
  polygon.getPath().forEach((element) => {
    polyBounds.extend(element)
  })

  map.fitBounds(polyBounds)
  map.setZoom()
  polygon.setMap(map)

  return {
    containsPoint(latLng) {
      return google.maps.geometry.poly.containsLocation(latLng, polygon)
    },
  }
}
