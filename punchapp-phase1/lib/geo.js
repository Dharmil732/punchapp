
export function haversineMeters(a, b){
  const R = 6371000
  const toRad = d => d*Math.PI/180
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const s = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2
  return 2*R*Math.atan2(Math.sqrt(s), Math.sqrt(1-s))
}
export function softGate(distanceM, radiusM, graceM=0){ return distanceM <= (radiusM + graceM) }
