import * as THREE from 'three'
import { OrbitControls } from 'jsm/controls/OrbitControls.js'
import { drawThreeGeo } from './src/threeGeoJSON.js'
import { CatmullRomCurve3 } from 'three'

const w = window.innerWidth
const h = window.innerHeight
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)
const camera = new THREE.PerspectiveCamera(75, w / h, 1, 100)
camera.position.z = 4
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const geometry = new THREE.SphereGeometry(2)
const lineMat = new THREE.LineBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.4
})
const edges = new THREE.EdgesGeometry(geometry, 1)
const line = new THREE.LineSegments(edges, lineMat)
scene.add(line)

// Tambahkan rotasi awal yang sama untuk line
// line.rotation.x = Math.PI * 0.5;

// Tambahkan variabel countries di scope global
let countries
let globeContainer = new THREE.Object3D()
scene.add(globeContainer)

// Tambahkan line ke dalam globeContainer, bukan langsung ke scene
globeContainer.add(line)

// Tambahkan fungsi untuk membuat kurva
function createArc(startLat, startLng, endLat, endLng, radius) {
  // Konversi koordinat ke posisi 3D
  const start = latLngToVector3(startLat, startLng, radius)
  const end = latLngToVector3(endLat, endLng, radius)

  // Titik kontrol untuk kurva
  const middle = start.clone().add(end).multiplyScalar(0.5)
  middle.normalize().multiplyScalar(radius * 1.3) // Mengatur ketinggian kurva

  // Buat kurva
  const curve = new CatmullRomCurve3([start, middle, end], false)

  // Buat geometri dari kurva
  const points = curve.getPoints(50)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  // Material untuk garis dengan efek glow
  const material = new THREE.LineBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.5,
    linewidth: 2
  })

  return new THREE.Line(geometry, material)
}

// Fungsi helper untuk konversi lat/lng ke Vector3
function latLngToVector3(lat, lng, radius) {
  const phi = ((90 - lat) * Math.PI) / 180
  const theta = ((lng + 180) * Math.PI) / 180

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

// Tambahkan beberapa koneksi contoh
function addConnections() {
  const connections = [
    // Asia & Pacific
    [31.2304, 121.4737, 35.6762, 139.6503], // Shanghai ke Tokyo
    [1.3521, 103.8198, -6.2088, 106.8456], // Singapore ke Jakarta
    [13.7563, 100.5018, 14.5995, 120.9842], // Bangkok ke Manila

    // Asia ke Europe
    [39.9042, 116.4074, 55.7558, 37.6173], // Beijing ke Moscow
    [28.6139, 77.209, 41.9028, 12.4964], // New Delhi ke Rome
    [25.2048, 55.2708, 52.52, 13.405], // Dubai ke Berlin

    // Europe Internal
    [51.5074, -0.1278, 48.8566, 2.3522], // London ke Paris
    [52.52, 13.405, 48.2082, 16.3738], // Berlin ke Vienna
    [41.9028, 12.4964, 40.4168, -3.7038], // Rome ke Madrid

    // Americas
    [40.7128, -74.006, -23.5505, -46.6333], // New York ke São Paulo
    [19.4326, -99.1332, -33.4489, -70.6693], // Mexico City ke Santiago
    [45.4215, -75.6972, -34.6037, -58.3816], // Ottawa ke Buenos Aires

    // Cross Pacific
    [37.7749, -122.4194, 35.6762, 139.6503], // San Francisco ke Tokyo
    [-33.8688, 151.2093, -41.2865, 174.7762], // Sydney ke Wellington

    // Africa Connections
    [30.0444, 31.2357, 6.5244, 3.3792], // Cairo ke Lagos
    [-33.9249, 18.4241, -1.2921, 36.8219], // Cape Town ke Nairobi
    [33.5731, -7.5898, 52.3676, 4.9041] // Casablanca ke Amsterdam
  ]

  connections.forEach(([startLat, startLng, endLat, endLng]) => {
    const arc = createArc(startLat, startLng, endLat, endLng, 2)
    globeContainer.add(arc)
  })
}

// Panggil setelah countries dimuat
fetch('./geojson/ne_110m_land.json')
  .then((response) => response.text())
  .then((text) => {
    const data = JSON.parse(text)
    countries = drawThreeGeo({
      json: data,
      radius: 2,
      materialOptions: {
        color: 0x80ff80
      }
    })
    globeContainer.add(countries)
    addConnections() // Tambahkan koneksi setelah globe dimuat
  })

// Modifikasi fungsi animate untuk animasi garis
function animate() {
  requestAnimationFrame(animate)

  globeContainer.rotation.y += 0.009

  // Update material untuk efek animasi (opsional)
  globeContainer.children.forEach((child) => {
    if (child instanceof THREE.Line) {
      child.material.opacity = 0.5 + Math.sin(Date.now() * 0.001) * 0.2
    }
  })

  renderer.render(scene, camera)
  controls.update()
}

animate()

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener('resize', handleWindowResize, false)
