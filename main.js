import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/Addons.js';
import { Easing, Tween, update as updateTween } from 'tween';


const images = [
    './Public/one.jpg',
    './Public/two.jpg',
    './Public/three.jpg',
    './Public/four.jpg',
    './Public/five.jpg',
    './Public/six.png',
]

const titles = [
    'Title 1',
    'Title 2',
    'Title 3',
    'Title 4',
    'Title 5',
    'Title 6'
]

const descriptions = [
    'Description 1',
    'Description 2',
    'Description 3',
    'Description 4',
    'Description 5',
    'Description 6'
]
const textureLoader = new THREE.TextureLoader();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const rootNode = new THREE.Object3D();
scene.add( rootNode );

const leftArrowTexture = textureLoader.load('./Public/left.png');
const rightArrowTexture = textureLoader.load('./Public/right.png');

let count = 6;
for (let i = 0; i < count; i++) {
    const texture = textureLoader.load(images[i]);
    texture.colorSpace = THREE.SRGBColorSpace;

    const baseNode = new THREE.Object3D();
    baseNode.rotation.y = (2 * Math.PI / count) * i;
    rootNode.add(baseNode);

    const border = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 2.2, 0.09),
        new THREE.MeshStandardMaterial({ color: 0x202020 })
    );
    border.name = `Border_${i}`;
    border.position.z = -4;
    baseNode.add(border);

    const artwork = new THREE.Mesh(
        new THREE.BoxGeometry(3, 2, 0.1),
        new THREE.MeshStandardMaterial({ map: texture })
    );
    artwork.position.z = -4;
    baseNode.add(artwork);
    artwork.name = `Art_${i}`;

    // Add left arrow
    const leftArrow = new THREE.Mesh(
        new THREE.PlaneGeometry(0.5, 0.5),
        new THREE.MeshStandardMaterial({ map: leftArrowTexture, transparent: true })
    );
    leftArrow.name = `LeftArrow_`;
    leftArrow.userData = (i === count - 1) ? 0 : i + 1;
    leftArrow.position.set(-1.9, 0, -3.9); // Adjust position as needed
    baseNode.add(leftArrow);

    // Add right arrow
    const rightArrow = new THREE.Mesh(
        new THREE.PlaneGeometry(0.5, 0.5),
        new THREE.MeshStandardMaterial({ map: rightArrowTexture, transparent: true })
    );
    rightArrow.name = `RightArrow_${i}`;
    rightArrow.userData = (i === 0) ? count - 1 : i - 1;
    rightArrow.position.set(1.9, 0, -3.9); // Adjust position as needed
    baseNode.add(rightArrow);
}

const spotlight = new THREE.SpotLight(0xffffff, 100.0, 10.0, 0.75, .9,);
spotlight.position.set(0, 5, 0);
spotlight.target.position.set(0, 0.5, -5);
scene.add(spotlight);
scene.add(spotlight.target);

const mirror = new Reflector(
    new THREE.CircleGeometry(10, 32),
    {
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        clipBias: 0.003,
        color: 0x303030,
    }
);
mirror.position.y = -1.25;
mirror.rotateX(-Math.PI / 2);
scene.add(mirror);

function rotateGallery(direction, newIndex) {
    const deltaY = (direction * (2 * Math.PI / count));

    new Tween(rootNode.rotation)
        .to({ y: rootNode.rotation.y + deltaY })
        .easing(Easing.Quadratic.InOut)
        .start()
        .onStart(() => {
            document.getElementById('title').style.opacity = 0;
            document.getElementById('description').style.opacity = 0;
        })
        .onComplete(() => {
            document.getElementById('title').innerText = titles[newIndex];
            document.getElementById('description').innerText = descriptions[newIndex];
            document.getElementById('title').style.opacity = 1;
            document.getElementById('description').style.opacity = 1;
       });
}

function animate() {
    updateTween();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

window.addEventListener('click', (event) => {
    const raycaster = new THREE.Raycaster();
    
    const mouseNDC = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouseNDC, camera);

    const intersections = raycaster.intersectObject(rootNode, true);

    if (intersections.length > 0) {
        const obj = intersections[0].object;
        const newIndex = obj.userData;
        if (obj.name === 'LeftArrow_') {
            rotateGallery(-1, newIndex);
        }   
        else if (obj.name.includes('RightArrow_')) {
            rotateGallery(1, newIndex);
        }
    }   
 
    
});

document.getElementById('title').innerText = titles[0];
document.getElementById('description').innerText = descriptions[0];