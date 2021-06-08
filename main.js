import "./style.css"

import * as THREE from "three";

// to make scene more interactive add orbit controls 
import {OrbitControls} from "./three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera );

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

torus.position.z = -50;
torus.position.setX(30);

//adding lighting to object
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

//make shape visible or put the light on the entire shape so that the entire shape is visible-->
const ambientLight = new THREE.AmbientLight(0xffffff);
//adding scene to object
scene.add(pointLight, ambientLight);


//adding light helper-->It basically shows the light source (from where the light is coming)-->a dimond shape will apear which shows the origin of light-->same thing is with grid helper-->
// -->-->-->-->-->-->-->Helper 
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

//listen dom events on the mouse and acts acording the mouse position
const controls = new OrbitControls(camera, renderer.domElement);


function moveCamera(){

  const t = document.body.getBoundingClientRect().top;
  //to rotate the mars on scroll
  mars.rotation.x += 0.05;
  mars.rotation.y += 0.075;
  mars.rotation.z += 0.05;

  //to rotate the avatar on scroll
  ayan.rotation.y += 0.01;
  ayan.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}
//assigning it eventhandler
document.body.onscroll = moveCamera;


//animate function to run it in loop

//adding more elements and populating them
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);
  //randomly positioning the elements

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star)

}
//how many star u want to add-->
Array(400).fill().forEach(addStar)

//adding space image to make space more realistic-->
const sapceTexture = new THREE.TextureLoader().load('./img/spaceFour.jpg');
scene.background = sapceTexture;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);

}

animate();


//Avatar-->Texture Mapping
const ayanTexture = new THREE.TextureLoader().load('./img/Ayan.png');


const ayan = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:ayanTexture})
);

//adding my avatar scene 
scene.add(ayan);


//Now we are adding a planet object 
const marsTexture = new THREE.TextureLoader().load('./img/marsss.png');
//to give more depth to the object
const normalTexture = new THREE.TextureLoader().load('./img/marstex.png');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture  
  })
);

scene.add(mars);
//positioning the mars

mars.position.z = 1;
mars.position.setX(-10);
