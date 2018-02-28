function makeTextSprite(str, color = "#FFFFFF") {
    var canvas = document.createElement('canvas');
    var size = 256; // CHANGED
    canvas.width = size;
    canvas.height = size;
    var context = canvas.getContext('2d');
    context.fillStyle = color; // CHANGED
    context.textAlign = 'center';
    context.font = '24px Tyler';
    context.fillText(str, size / 2, size / 2);
    var amap = new THREE.Texture(canvas);
    amap.needsUpdate = true;

    var mat = new THREE.SpriteMaterial({
        map: amap,
        transparent: false,
        useScreenCoordinates: false,
        color: 0xffffff // CHANGED
    });

    var sp = new THREE.Sprite(mat);
    sp.scale.set(2, 2, 1); // CHANGED
    return sp;
}
