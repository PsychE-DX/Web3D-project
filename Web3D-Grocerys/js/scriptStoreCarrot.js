var scene_carrot;
(function () {
    const container_carrot = document.getElementById('three-container-carrot');
    const carrotValue = parseInt(localStorage.getItem('carrot'), 10);

    if (!carrotValue || carrotValue <= 0) {
        container_carrot.style.display = 'none';
        return;
    }

     scene_carrot = new THREE.Scene(); 
    camera_carrot = new THREE.PerspectiveCamera(30, container_carrot.clientWidth / container_carrot.clientHeight, 0.1, 1000);
    camera_carrot.position.set(10, 0, 0);
  
    // Add lighting
    const ambient_carrot = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene_carrot.add(ambient_carrot);
  
    const light1 = new THREE.DirectionalLight();
    light1.position.set(-10, 15, -6);
    scene_carrot.add(light1);
    light1.intensity = 1;
    const light2 = new THREE.DirectionalLight();
    light2.position.set(0, 13, 16);
    scene_carrot.add(light2);
    light2.intensity = 1;
    const light3 = new THREE.DirectionalLight();
    light3.position.set(15, 10, 7);
    scene_carrot.add(light3);
    light3.intensity = 1;
    const light4 = new THREE.DirectionalLight();
    light4.position.set(5, -10, 0);
    light4.intensity = 1;
    scene_carrot.add(light4);
    let renderer_carrot = new THREE.WebGLRenderer();
    scene_carrot.background = new THREE.Color(0x00aaff);
    container_carrot.addEventListener("click", function(){
        scene_carrot.background = new THREE.Color('green');
        if (scene_apple){
        scene_apple.background = new THREE.Color(0x00aaff);
        }
        if (scene){
        scene.background = new THREE.Color(0x00aaff);
        }
    });
    renderer_carrot.setSize(container_carrot.clientWidth, container_carrot.clientHeight);
    container_carrot.appendChild(renderer_carrot.domElement);

    const loader_carrot = new THREE.GLTFLoader();
    loader_carrot.load('assets/glb/Carrot_real.glb', (gltf) => {
        const model_carrot = gltf.scene;
        scene_carrot.add(model_carrot);
        camera_carrot.position.set(0, 2, 20);
        camera_carrot.lookAt(model_carrot.position);
        new THREE.OrbitControls(camera_carrot, renderer_carrot.domElement);
    });

    window.addEventListener('resize', () => {
        camera_carrot.aspect = container_carrot.clientWidth / container_carrot.clientHeight;
        camera_carrot.updateProjectionMatrix();
        renderer_carrot.setSize(container_carrot.clientWidth, container_carrot.clientHeight);
    });

    function animate_carrot() {
        requestAnimationFrame(animate_carrot);
        renderer_carrot.render(scene_carrot, camera_carrot);
    }
    animate_carrot();
})();
