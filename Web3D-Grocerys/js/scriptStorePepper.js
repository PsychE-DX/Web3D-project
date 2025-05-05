var scene;
(function () {
    const container = document.getElementById('three-container-pepper');
    const pepperValue = parseInt(localStorage.getItem('pepper'), 10);
   
    if (!pepperValue || pepperValue <= 0) {
        container.style.display = 'none';
        return;
    }

     scene = new THREE.Scene(); 
    camera = new THREE.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 0.1, 1000);
  
    // Add lighting
    const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(ambient);
  
    const light1 = new THREE.DirectionalLight();
    light1.position.set(-10, 15, -6);
    scene.add(light1);
    light1.intensity = 1;
    const light2 = new THREE.DirectionalLight();
    light2.position.set(0, 13, 16);
    scene.add(light2);
    light2.intensity = 1;
    const light3 = new THREE.DirectionalLight();
    light3.position.set(15, 10, 7);
    scene.add(light3);
    light3.intensity = 1;
    const light4 = new THREE.DirectionalLight();
    light4.position.set(5, -10, 0);
    light4.intensity = 1;
    scene.add(light4);
    const light5 = new THREE.DirectionalLight();
    light5.position.set(-10,6,5);
    light5.intensity= 1;
    scene.add(light5);
    const light6 = new THREE.AmbientLight();
    scene.add(light6);
    let renderer = new THREE.WebGLRenderer();
    scene.background = new THREE.Color(0x00aaff);
    
    container.addEventListener("click", function(){
        scene.background = new THREE.Color('green');
        if (scene_apple){
        scene_apple.background = new THREE.Color(0x00aaff);
        }
        if (scene_carrot){
        scene_carrot.background = new THREE.Color(0x00aaff);
        }
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const loader = new THREE.GLTFLoader();
    loader.load('assets/glb/Bell_Pepper_real.glb', (gltf) => {
        const model = gltf.scene;
        const colors = ['#3B7A1B', 'red', '#FBC02D']; // green, red, yellow
        let colorIndex = 1;
        // Function to apply a color to all mesh parts
        function applyColorToModel(model, color) {
            let index = 0;
          model.traverse((child) => {
            if (child.isMesh && child.material && child.material.color) {
                if (index == 0){
              child.material.color.set(color);
              if (color != 'red'){
              if ('metalness' in child.material) child.material.metalness = 0.8;
              if ('roughness' in child.material) child.material.roughness = 0.5;
              }else {
                if ('metalness' in child.material) child.material.metalness = 1;
              }
                }
                index++;
            }
           
          });
        }
        // Start cycling colors every 3 seconds
        setInterval(() => {
          colorIndex = (colorIndex + 1) % colors.length; // loop back to start
          applyColorToModel(model, colors[colorIndex]);
        }, 3000); // change every 3 seconds
    

        scene.add(model);
        camera.position.set(0, 2, 20);
        camera.lookAt(model.position);
        new THREE.OrbitControls(camera, renderer.domElement);
    });

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
})();
