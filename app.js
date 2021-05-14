import * as THREE from 'three'
import gsap from 'gsap'
import './style.scss'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'
const gui = new dat.GUI()

const size = {
	width: window.innerWidth,
	height: window.innerHeight
}

const cursor = {
	x: 0,
	y: 0
}

window.addEventListener( 'mousemove', e => {
	cursor.x = e.clientX / size.width - 0.5
	cursor.y = e.clientY / size.height - 0.5
} )

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xdddddd )

// Camera
const camera = new THREE.PerspectiveCamera( 40, size.width / size.height, 0.1, 1000 )

// Model
const loader = new GLTFLoader()
let obj;
loader.load( './gtlf/viking_room/scene.gltf', gltf => {
	obj = gltf
	obj.scene.rotation.set( 0.27, 5.6, 0 )
	gui.add( obj.scene.rotation, 'x', 0, 9 )
	gui.add( obj.scene.rotation, 'y', 0, 9 )

	scene.add( obj.scene )
} )

const renderer = new THREE.WebGLRenderer( { antialias: true } )
renderer.setSize( size.width, size.height )
renderer.setPixelRatio( Math.min( window.devicePixelRatio, 3 ) )

document.body.appendChild( renderer.domElement )

/**
 * Light
 */
const hlight = new THREE.AmbientLight( 0xf4f4f4, 10 )
scene.add( hlight )

camera.position.z = 80

const animate = () => {
	requestAnimationFrame( animate )

	if ( obj && obj.scene ) {
		obj.scene.rotation.y = -cursor.x * 3
		// obj.scene.rotation.x = -cursor.x * 3
	}
	
	// obj ? obj.scene ? obj.scene.rotation.y += 0.004 : null : null

	renderer.render( scene, camera )
}
animate()

window.addEventListener( 'resize', () => {
	size.width = window.innerWidth
	size.height = window.innerHeight

	renderer.setSize( size.width, size.height )

	camera.aspect = size.width / size.height
	camera.updateProjectionMatrix()
} )

window.addEventListener( 'dblclick', () => {
	const canvas = document.querySelector( 'canvas' )
	const isFullScreen = document.fullscreenElement || document.webkitFullscreenElement
	isFullScreen ? ( document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.exitFullscreen() )
				: ( canvas.webkitRequestFullscreen ? canvas.webkitRequestFullscreen() : canvas.requestFullscreen() )
} )