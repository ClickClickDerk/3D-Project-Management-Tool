// Check for WebGL support
if (!window.WebGLRenderingContext) {
    console.error('WebGL is not supported in your browser.');
} else {
    // Basic Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    pointLight.castShadow = true;
    scene.add(pointLight);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid helper
    const gridHelper = new THREE.GridHelper(100, 100);
    scene.add(gridHelper);

    // Enhanced nebula and galaxy background
    const createGalaxy = () => {
        const galaxyGeometry = new THREE.BufferGeometry();
        const galaxyVertices = [];
        const galaxyColors = [];
        const galaxySize = 2000;

        for (let i = 0; i < 10000; i++) {
            const x = THREE.MathUtils.randFloatSpread(galaxySize);
            const y = THREE.MathUtils.randFloatSpread(galaxySize);
            const z = THREE.MathUtils.randFloatSpread(galaxySize);

            galaxyVertices.push(x, y, z);

            const color = new THREE.Color();
            color.setHSL(Math.random(), 1.0, 0.7);
            galaxyColors.push(color.r, color.g, color.b);
        }

        galaxyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(galaxyVertices, 3));
        galaxyGeometry.setAttribute('color', new THREE.Float32BufferAttribute(galaxyColors, 3));
        const galaxyMaterial = new THREE.PointsMaterial({ size: 2, vertexColors: true, transparent: true, opacity: 0.8 });
        const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
        scene.add(galaxy);
    };

    createGalaxy();

    // Nebula-like background effect
    let nebulaField;
    const createNebulaField = (color = 0.6) => {
        if (nebulaField) scene.remove(nebulaField);
        const nebulaGeometry = new THREE.BufferGeometry();
        const nebulaVertices = [];
        const nebulaColors = [];
        for (let i = 0; i < 1000; i++) {
            const x = THREE.MathUtils.randFloatSpread(2000);
            const y = THREE.MathUtils.randFloatSpread(2000);
            const z = THREE.MathUtils.randFloatSpread(2000);

            nebulaVertices.push(x, y, z);

            const colorObj = new THREE.Color();
            colorObj.setHSL(color, 1.0, 0.5);
            nebulaColors.push(colorObj.r, colorObj.g, colorObj.b);
        }
        nebulaGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nebulaVertices, 3));
        nebulaGeometry.setAttribute('color', new THREE.Float32BufferAttribute(nebulaColors, 3));
        const nebulaMaterial = new THREE.PointsMaterial({ size: 2, vertexColors: true, opacity: 0.5, transparent: true });
        nebulaField = new THREE.Points(nebulaGeometry, nebulaMaterial);
        scene.add(nebulaField);
    };
    createNebulaField();

    // Project nodes
    const projectNodes = [];
    const projectData = {};
    const colors = [0xff00ff, 0x00ffff, 0xee82ee]; // neon hot pink, neon powder blue, neon lavender

    const createProjectNode = (name, description, x, y, z) => {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random() * colors.length)] });
        const node = new THREE.Mesh(geometry, material);
        node.position.set(x, y, z);
        node.name = name;
        node.description = description;
        node.castShadow = true;
        node.receiveShadow = true;
        projectData[name] = { description, tasks: [] };
        scene.add(node);
        projectNodes.push(node);
    };

    // Add some project nodes for demonstration
    createProjectNode('Project 1', 'Description of Project 1', 0, 0, 0);
    createProjectNode('Project 2', 'Description of Project 2', 5, 5, 5);

    // Drag-and-drop functionality
    let selectedNode = null;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onMouseDown = (event) => {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(projectNodes);
        if (intersects.length > 0) {
            selectedNode = intersects[0].object;
            showProjectDetails(selectedNode);
        }
    };

    const onMouseUp = () => {
        selectedNode = null;
    };

    const onDocumentMouseMove = (event) => {
        if (selectedNode) {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(ground, true);
            if (intersects.length > 0) {
                selectedNode.position.copy(intersects[0].point);
            }
        }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onDocumentMouseMove);

    // Voice commands using native Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.onresult = (event) => {
            const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            if (!command.startsWith('nyx')) return;
            const cleanCommand = command.replace('nyx', '').trim();

            // Add project command
            if (cleanCommand.startsWith('add project')) {
                const name = cleanCommand.replace('add project', '').trim();
                createProjectNode(name, 'No description yet', Math.random() * 10, Math.random() * 10, Math.random() * 10);
            }
            
            // Delete project command
            else if (cleanCommand.startsWith('delete project')) {
                const name = cleanCommand.replace('delete project', '').trim();
                deleteProjectNode(name);
            }
            
            // List projects command
            else if (cleanCommand === 'list projects') {
                listAllProjects();
            }
            
            // Change node color command
            else if (cleanCommand.startsWith('change color of project')) {
                const [_, name, color] = cleanCommand.match(/change color of project (\S+) to (\S+)/);
                changeProjectNodeColor(name, color);
            }
            
            // Change node opacity command
            else if (cleanCommand.startsWith('change opacity of project')) {
                const [_, name, opacity] = cleanCommand.match(/change opacity of project (\S+) to (\d+(\.\d+)?)/);
                changeProjectNodeOpacity(name, parseFloat(opacity));
            }
            
            // Move node command
            else if (cleanCommand.startsWith('move project')) {
                const [_, name, x, y, z] = cleanCommand.match(/move project (\S+) to (\d+(\.\d+)?) (\d+(\.\d+)?) (\d+(\.\d+)?)/);
                moveProjectNode(name, parseFloat(x), parseFloat(y), parseFloat(z));
            }
            
            // Add task to project command
            else if (cleanCommand.startsWith('add task to project')) {
                const [_, task, name] = cleanCommand.match(/add task to project (.+) to (\S+)/);
                addTaskToProject(name, task);
            }
            
            // Background manipulation commands
            
            // Change background color
            else if (cleanCommand.startsWith('change background color to')) {
                const color = cleanCommand.replace('change background color to', '').trim();
                changeBackgroundColor(color);
            }
            
            // Toggle starfield visibility
            else if (cleanCommand === 'toggle starfield') {
                toggleStarfieldVisibility();
            }
            
            // Toggle nebula visibility
            else if (cleanCommand === 'toggle nebula') {
                toggleNebulaVisibility();
            }
            
            // Animate starfield
            else if (cleanCommand === 'animate starfield') {
                animateStarfield();
            }
            
            // Change starfield density
            else if (cleanCommand.startsWith('change starfield density to')) {
                const density = parseInt(cleanCommand.replace('change starfield density to', '').trim(), 10);
                changeStarfieldDensity(density);
            }
            
            // Change nebula color
            else if (cleanCommand.startsWith('change nebula color to')) {
                const color = parseFloat(cleanCommand.replace('change nebula color to', '').trim());
                changeNebulaColor(color);
            }
        };
        recognition.start();
    } else {
        console.error('Speech recognition is not supported in this browser.');
    }

    // Function to delete a project node by name
    const deleteProjectNode = (name) => {
        const node = projectNodes.find(node => node.name === name);
        if (node) {
            scene.remove(node);
            const index = projectNodes.indexOf(node);
            if (index > -1) {
                projectNodes.splice(index, 1);
            }
            console.log(`Project ${name} deleted`);
        } else {
            console.error(`Project ${name} not found`);
        }
    };

    // Function to list all project nodes
    const listAllProjects = () => {
        console.log('List of all projects:');
        projectNodes.forEach(node => console.log(node.name));
    };

    // Function to change the color of a project node by name
    const changeProjectNodeColor = (name, color) => {
        const node = projectNodes.find(node => node.name === name);
        if (node) {
            node.material.color.set(color);
            console.log(`Project ${name} color changed to ${color}`);
        } else {
            console.error(`Project ${name} not found`);
        }
    };

    // Function to change the opacity of a project node by name
    const changeProjectNodeOpacity = (name, opacity) => {
        const node = projectNodes.find(node => node.name === name);
        if (node) {
            node.material.opacity = opacity;
            node.material.transparent = opacity < 1;
            console.log(`Project ${name} opacity changed to ${opacity}`);
        } else {
            console.error(`Project ${name} not found`);
        }
    };

    // Function to move a project node by name
    const moveProjectNode = (name, x, y, z) => {
        const node = projectNodes.find(node => node.name === name);
        if (node) {
            node.position.set(x, y, z);
            console.log(`Project ${name} moved to (${x}, ${y}, ${z})`);
        } else {
            console.error(`Project ${name} not found`);
        }
    };

    // Function to add a task to a project node by name
    const addTaskToProject = (name, task) => {
        if (projectData[name]) {
            projectData[name].tasks.push(task);
            console.log(`Task "${task}" added to project ${name}`);
        } else {
            console.error(`Project ${name} not found`);
        }
    };

    // Function to change the background color
    const changeBackgroundColor = (color) => {
        renderer.setClearColor(color);
        console.log(`Background color changed to ${color}`);
    };

    // Function to toggle starfield visibility
    const toggleStarfieldVisibility = () => {
        starField.visible = !starField.visible;
        console.log(`Starfield visibility: ${starField.visible}`);
    };

    // Function to toggle nebula visibility
    const toggleNebulaVisibility = () => {
        nebulaField.visible = !nebulaField.visible;
        console.log(`Nebula visibility: ${nebulaField.visible}`);
    };

    // Function to animate starfield
    let animationId;
    const animateStarfield = () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
            console.log('Starfield animation stopped');
        } else {
            const animate = () => {
                starField.rotation.y += 0.001;
                animationId = requestAnimationFrame(animate);
                renderer.render(scene, camera);
            };
            animate();
            console.log('Starfield animation started');
        }
    };

    // Function to change starfield density
    const changeStarfieldDensity = (density) => {
        createStarField(density);
        console.log(`Starfield density changed to ${density}`);
    };

    // Function to change nebula color
    const changeNebulaColor = (color) => {
        createNebulaField(color);
        console.log(`Nebula color changed to ${color}`);
    };

    // GUI controls
    const gui = new dat.GUI({ autoPlace: false });
    document.getElementById('gui').appendChild(gui.domElement);

    const guiControls = {
        color: '#ffffff',
        opacity: 1
    };

    gui.addColor(guiControls, 'color').onChange((value) => {
        if (selectedNode) {
            selectedNode.material.color.set(value);
        }
    });

    gui.add(guiControls, 'opacity', 0, 1).onChange((value) => {
        if (selectedNode) {
            selectedNode.material.opacity = value;
            selectedNode.material.transparent = value < 1;
        }
    });

    // Project details panel
    const showProjectDetails = (node) => {
        document.getElementById('projectName').innerText = node.name;
        document.getElementById('projectDescription').innerText = node.description;
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        projectData[node.name].tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerText = task;
            taskList.appendChild(taskItem);
        });
        document.getElementById('projectDetails').style.display = 'block';
    };

    const addTask = () => {
        const taskName = document.getElementById('newTaskName').value;
        if (taskName && selectedNode) {
            projectData[selectedNode.name].tasks.push(taskName);
            const taskItem = document.createElement('li');
            taskItem.innerText = taskName;
            document.getElementById('taskList').appendChild(taskItem);
            document.getElementById('newTaskName').value = '';
        }
    };

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };
    animate();

    // Adjust camera position
    camera.position.z = 10;
}
