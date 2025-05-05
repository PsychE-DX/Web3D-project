var scene_apple;
(function () {
    const container_apple = document.getElementById('three-container-apple');
    const appleValue = parseInt(localStorage.getItem('apple'), 10);

    if (!appleValue || appleValue <= 0) {
        container_apple.style.display = 'none';
        return;
    }

   scene_apple = new THREE.Scene(); 
    camera_apple = new THREE.PerspectiveCamera(30, container_apple.clientWidth / container_apple.clientHeight, 0.1, 1000);
    camera_apple.position.set(10, 0, 0);
  
    // Add lighting
    const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene_apple.add(ambient);
  
 
    const light1 = new THREE.DirectionalLight();
    light1.position.set(-10, 15, -6);
    scene_apple.add(light1);
    light1.intensity = 1;
    const light2 = new THREE.DirectionalLight();
    light2.position.set(0, 13, 16);
    scene_apple.add(light2);
    light2.intensity = 1;
    const light3 = new THREE.DirectionalLight();
    light3.position.set(15, 10, 7);
    scene_apple.add(light3);
    light3.intensity = 1;
    const light4 = new THREE.DirectionalLight();
    light4.position.set(5, -10, 0);
    light4.intensity = 1;
    scene_apple.add(light4);
    let renderer_apple = new THREE.WebGLRenderer();
    scene_apple.background = new THREE.Color(0x00aaff);
    container_apple.addEventListener("click", function(){
        scene_apple.background = new THREE.Color('green');
        if (scene_carrot){
        scene_carrot.background = new THREE.Color('red');
        }
        if (scene){
        scene.background = new THREE.Color(0x00aaff);
        }
    });
    renderer_apple.setSize(container_apple.clientWidth, container_apple.clientHeight);
    container_apple.appendChild(renderer_apple.domElement);


    const loader_apple = new THREE.GLTFLoader();
    loader_apple.load('assets/glb/apple_Real2.glb', (gltf) => {
        const model_apple = gltf.scene;
        scene_apple.add(model_apple);
        camera_apple.position.set(0, 2, 20);
        camera_apple.lookAt(model_apple.position);
        new THREE.OrbitControls(camera_apple, renderer_apple.domElement);
    });

    window.addEventListener('resize', () => {
        camera_apple.aspect = container_apple.clientWidth / container_apple.clientHeight;
        camera_apple.updateProjectionMatrix();
        renderer_apple.setSize(container_apple.clientWidth, container_apple.clientHeight);
    });

    function animate_apple() {
        requestAnimationFrame(animate_apple);
        renderer_apple.render(scene_apple, camera_apple);
    }
    animate_apple();
})();
