if (!document) {
    var THREE = require('three');
}

//NOTHING ABOVE THIS LINE IS ESSENTIAL ------------------------------------

var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 1000);
camera.position.set(10, 5, 10);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera);//You don't need to know anything about this;
controls.enablePan = false; //stops you from being able to change position of camera
//=======================================================================================

var light = new THREE.PointLight(0xFFFFFF, 1, 50)
light.position.set(20, 20, 10);
var ambient = new THREE.AmbientLight(0x404040, 1);
scene.add(light)
scene.add(ambient);

var geom = new THREE.SphereGeometry(0.5, 32, 32);
var mat = new THREE.MeshPhongMaterial();
var earthMesh = new THREE.Mesh(geom, mat);
scene.add(earthMesh);



var img = document.createElement('img')
img.src = 'images/earth/earthmap1k.jpg';
var texture = new THREE.Texture(img);
img.addEventListener('load', function (event) { texture.needsUpdate = true; });

mat.map = texture;
//mat.map = THREE.ImageUtils.loadTexture('images/earth/earthmap1k.jpg')

camera.lookAt(new THREE.Vector3(0, 0, 0));
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

