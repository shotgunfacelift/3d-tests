import './style.css'
import * as THREE from 'three';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const material = new THREE.MeshBasicMaterial({color: 0xff380e, wireframe: true});

const s2kLoader = new OBJLoader();
s2kLoader.load( './assets/s2k.obj', ( s2k ) => {
      s2k.traverse( child => {
        if (child.isMesh){
            child.material = material;
        }
    })

      s2k.translateX(-15)
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
      c4.translateX(17)
      c4.translateY(10)

  scene.add( c4 );

  function animate() {
    requestAnimationFrame(animate);
  
    c4.rotation.y -= 0.01;
  
    renderer.render(scene, camera);
  }
  animate()
} )