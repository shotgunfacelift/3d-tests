import './style.css'
import * as THREE from 'three';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 17, 40);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(30);

renderer.render(scene, camera);

const material = new THREE.MeshBasicMaterial({color: 0xff380e, wireframe: true});

const s2kLoader = new OBJLoader();
s2kLoader.load( './assets/s2k.obj', ( s2k ) => {
      s2k.traverse( child => {
        if (child.isMesh){
            child.material = material;
        }
    })

      s2k.translateX(-30)
      s2k.translateY(10)

			scene.add( s2k );
      
      function animate() {
        requestAnimationFrame(animate);
        s2k.rotation.y -= 0.01;
      
        renderer.render(scene, camera);
      }
      animate()
		} )


const c4Loader = new OBJLoader();
c4Loader.load( './assets/c4.obj', ( c4 ) => {
  c4.traverse( child => {
    if (child.isMesh){
        child.material = material;
    }
})
      c4.translateX(0)
      c4.translateY(10)

  scene.add( c4 );

  function animate() {
    requestAnimationFrame(animate);
  
    c4.rotation.y -= 0.01;
  
    renderer.render(scene, camera);
  }
  animate()
} )

const nissanLoader = new OBJLoader();
nissanLoader.load( './assets/nissan.obj', ( nissan ) => {
  nissan.traverse( child => {
    if (child.isMesh){
        child.material = material;
    }
})
      nissan.translateX(30)
      nissan.translateY(10)

  scene.add( nissan );

  function animate() {
    requestAnimationFrame(animate);
  
    nissan.rotation.y -= 0.01;
  
    renderer.render(scene, camera);
  }
  animate()
} )

//EXPERIMENTAL HOVER FEATURE

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(-1, -1);

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

document.addEventListener('mousemove', onMouseMove, false);

function render() {
  requestAnimationFrame(render);
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    intersects[0].object.material.color.set(0x48ff0e);
  }
  else {
    material.color.set(0xff380e);
  }

  renderer.render(scene, camera);
}

render();