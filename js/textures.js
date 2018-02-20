if (!document) {
    var THREE = require('three');
}

//NOTHING ABOVE THIS LINE IS ESSENTIAL ------------------------------------

var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 1000);
camera.position.set(1, 0.4, 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//     C O N T R O L S   A R E    T U R N E D   O F F    F O R    T H I S
var controls = new THREE.OrbitControls(camera);//You don't need to know anything about this;
controls.enablePan = false; //stops you from being able to change position of camera
//=======================================================================================

var light = new THREE.PointLight(0xFFFFFF, 2.5, 50)
light.position.set(20, 20, 10);
var ambient = new THREE.AmbientLight(0x404040, 0.05);
scene.add(light)
scene.add(ambient);

/**
 * Texture loader object, used per advice given by THREE.js documentation instead of THREE.ImageUtils.loadTexture()
 */
var textureLoader = new THREE.TextureLoader();

var geom = new THREE.SphereGeometry(0.5, 32, 32);
var mat = new THREE.MeshPhongMaterial();
var earthMesh = new THREE.Mesh(geom, mat);

var earthMapImg = document.createElement('img');
earthMapImg.src = 'images/earth/earthmapSquare.jpg';
var earthMapTexture = new THREE.Texture(earthMapImg);
earthMapImg.addEventListener('load', function (e) {
    earthMapTexture.needsUpdate = true;
})
mat.map = earthMapTexture;//textureLoader.load('images/earth/earthmapSquare.jpg')//earth

var earthBumpImg = document.createElement('img');
earthBumpImg.src = 'images/earth/earthbumpSquare.jpg';
var earthBumpTexture = new THREE.Texture(earthBumpImg);
earthBumpImg.addEventListener('load', function (e) {
    earthBumpTexture.needsUpdate = true;
});

mat.bumpMap = earthBumpTexture;//textureLoader.load('images/earth/earthbumpSquare.jpg');//bumps
mat.bumpScale = 0.5;

var specImg = document.createElement('img');
specImg.src = 'images/earth/earthSpecSquare.jpg';
var earthSpecTexture = new THREE.Texture(specImg);
specImg.addEventListener('load', function (e) {
    earthSpecTexture.needsUpdate = true
});

mat.specularMap = earthSpecTexture;//textureLoader.load('images/earth/earthspecSquare.jpg');//reflectivity
mat.specular = new THREE.Color(0xAAAAAA);//what color should areas be when reflecting light;


//======== C L O U D S =======

var geom = new THREE.SphereGeometry(0.51, 32, 32);
var mat = new THREE.MeshPhongMaterial({
    map: textureLoader.load('images/earth/earthcloudmap.jpg'),//cloudTexture,
    alphaMap: textureLoader.load('images/earth/earthCloudAlpha.jpg'),//alphaTexture,
    side: THREE.DoubleSide,
    opacity: 0.8,
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
mat.map = textureLoader.load('images/star-field-background.jpg');//THREE.ImageUtils.loadTexture('images/star-field-background.jpg');
mat.side = THREE.BackSide;
var space = new THREE.Mesh(geom, mat);
scene.add(space);


camera.lookAt(new THREE.Vector3(0, 0, 0));
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.target = new THREE.Vector3(0,0,0)
delta = 0;
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    earthMesh.rotateY(Math.PI / 1900)
    cloudMesh.rotateY(Math.PI / 1700);
    controls.update();
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    delta += 2 * Math.PI / 10000;
}

animate();


