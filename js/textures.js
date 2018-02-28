if (!document) {
    var THREE = require('three');
}

//NOTHING ABOVE THIS LINE IS ESSENTIAL ------------------------------------

var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 1000);

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

//Creating textures using domElements and their 'onLoad' functions prevents github pages from failing to load the resources
//by the time they are used. It waits for the resource to be loaded, then updates the texture WHEN that happens
var earthMapImg = document.createElement('img');
earthMapImg.src = 'images/earth/earthmapSquare.jpg';
var earthMapTexture = new THREE.Texture(earthMapImg);
earthMapImg.addEventListener('load', function (e) {
    earthMapTexture.needsUpdate = true;
})
mat.map = earthMapTexture;//textureLoader.load('images/earth/earthmapSquare.jpg')

//Bumps
var earthBumpImg = document.createElement('img');
earthBumpImg.src = 'images/earth/earthBumpSquare.jpg';
var earthBumpTexture = new THREE.Texture(earthBumpImg);
earthBumpImg.addEventListener('load', function (e) {
    earthBumpTexture.needsUpdate = true;
});
mat.bumpMap = earthBumpTexture;//textureLoader.load('images/earth/earthbumpSquare.jpg');
mat.bumpScale = 0.5;

//Specular
var specImg = document.createElement('img');
specImg.src = 'images/earth/earthSpecSquare.jpg';
var earthSpecTexture = new THREE.Texture(specImg);
specImg.addEventListener('load', function (e) {
    earthSpecTexture.needsUpdate = true
});
mat.specularMap = earthSpecTexture;//textureLoader.load('images/earth/earthspecSquare.jpg');//reflectivity
mat.specular = new THREE.Color(0xAAAAAA);//what color should areas be when reflecting light;


//======== C L O U D S =======
//Map
var cloudMapImg = document.createElement('img');
cloudMapImg.src = 'images/earth/earthcloudmap.jpg'
cloudMapTexture = new THREE.Texture(cloudMapImg);
cloudMapImg.addEventListener('load', function (e) {
    cloudMapTexture.needsUpdate = true;
})

//Alpha
var cloudAlphaImg = document.createElement('img');
cloudAlphaImg.src = 'images/earth/earthCloudAlpha.jpg'
cloudAlphaTexture = new THREE.Texture(cloudAlphaImg);
cloudAlphaImg.addEventListener('load', function (e) {
    cloudAlphaTexture.needsUpdate = true;
})


var geom = new THREE.SphereGeometry(0.51, 32, 32);
var mat = new THREE.MeshPhongMaterial({
    map: cloudMapTexture,//textureLoader.load('images/earth/earthcloudmap.jpg'),//cloudTexture,
    alphaMap: cloudAlphaTexture,//textureLoader.load('images/earth/earthCloudAlpha.jpg'),//alphaTexture,
    side: THREE.DoubleSide,
    opacity: 1.2,
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
var spaceImg = document.createElement('img');
spaceImg.src = 'images/star-field-background.jpg';
var spaceTexture = new THREE.Texture(spaceImg);
spaceImg.addEventListener('load', function (e) {
    spaceTexture.needsUpdate = true;
})
mat.map = spaceTexture;//textureLoader.load('images/star-field-background.jpg');//THREE.ImageUtils.loadTexture('images/star-field-background.jpg');
mat.side = THREE.BackSide;
var space = new THREE.Mesh(geom, mat);
scene.add(space);
//========================= B A C K G R O U N D    D O N E   ========================================//

//================== M  O  O  N  ======================================================//
var geom = new THREE.SphereGeometry(0.1,32,32)
var mat = new THREE.MeshPhongMaterial();
var moonMapImg = document.createElement('img');
moonMapImg.src = 'images/moon/map.jpg';
var moonMapTexture = new THREE.Texture(moonMapImg);
moonMapImg.addEventListener('load',function(e){
    moonMapTexture.needsUpdate = true;
})
mat.map = moonMapTexture;
var moon = new THREE.Mesh(geom,mat);
moon.update = function(delta){
    moon.position.x = 2*Math.cos(delta)
    moon.position.z = 2*Math.sin(delta);
}
scene.add(moon);

//========================================================

var sp = makeTextSprite("Earth", "#00FFFF");
scene.add(sp);
sp.position.set(0, 0.6, 0);

camera.position.set(1*2.5, 0.4*2.5, 1*2.5);
camera.lookAt(new THREE.Vector3(0, 0, 0));
controls.autoRotate = true;
controls.autoRotateSpeed = 0.2;
controls.target = new THREE.Vector3(0,0,0)
delta = 0;
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    earthMesh.rotateY(Math.PI / 1900)
    cloudMesh.rotateY(Math.PI / 1700);
    moon.update(delta*5);
    controls.update();
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    delta += 2 * Math.PI / 10000;
}

animate();


