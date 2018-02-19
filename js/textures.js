if (!document) {
    var THREE = require('three');
}

//NOTHING ABOVE THIS LINE IS ESSENTIAL ------------------------------------

var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 1000);
camera.position.set(2, 1, 2);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//     C O N T R O L S   A R E    T U R N E D   O F F    F O R    T H I S
//var controls = new THREE.OrbitControls(camera);//You don't need to know anything about this;
//controls.enablePan = false; //stops you from being able to change position of camera
//=======================================================================================

var light = new THREE.PointLight(0xFFFFFF, 1, 50)
light.position.set(20, 20, 10);
var ambient = new THREE.AmbientLight(0x404040, 1);
scene.add(light)
scene.add(ambient);

var geom = new THREE.SphereGeometry(0.5, 32, 32);
var mat = new THREE.MeshPhongMaterial();
var earthMesh = new THREE.Mesh(geom, mat);

mat.map = THREE.ImageUtils.loadTexture('images/earth/earthmapSquare.jpg')//earth
mat.bumpMap = THREE.ImageUtils.loadTexture('images/earth/earthbumpSquare.jpg');//bumps
mat.bumpScale = 0.5;
mat.specularMap = THREE.ImageUtils.loadTexture('images/earth/earthspecSquare.jpg');//reflectivity
mat.specular = new THREE.Color(0xAAAAAA);//what color should areas be when reflecting light;

//======== C L O U D S =======

var geom = new THREE.SphereGeometry(0.51, 32, 32);
var mat = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('images/earth/earthcloudmap.jpg'),//cloudTexture,
    alphaMap: THREE.ImageUtils.loadTexture('images/earth/earthCloudAlpha.jpg'),//alphaTexture,
    side: THREE.DoubleSide,
    opacity: 0.9,
    transparent: true,
    depthWrite: false
})
var cloudMesh = new THREE.Mesh(geom, mat);
scene.add(cloudMesh);
scene.add(earthMesh);

//===================== C L O U D S     D O N E ===========================

// ==================   B A C K G R O U N D ==============================
var geom = new THREE.CubeGeometry(90, 90,90);
var mat = new THREE.MeshBasicMaterial();
mat.map = THREE.ImageUtils.loadTexture('images/star-field-background.jpg');
mat.side = THREE.BackSide;
var space = new THREE.Mesh(geom, mat);
scene.add(space);


camera.lookAt(new THREE.Vector3(0, 0, 0));
delta = 0;
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    earthMesh.rotateY(Math.PI / 2000)
    cloudMesh.rotateY(Math.PI / 1800);
    camera.position.x = 2 * Math.sin(delta);
    camera.position.z = 2 * Math.cos(delta);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    delta += 2 * Math.PI / 10000;
}

animate();


