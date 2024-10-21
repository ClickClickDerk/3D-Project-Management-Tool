<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>3D Project Management Tool</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <meta name="description" content="An interactive 3D project management tool built with Three.js, allowing you to visualize, manage, and interact with your projects in a 3D environment.">
    <meta name="keywords" content="3D, Project Management, Three.js, Interactive, Visualization">
    <meta name="author" content="nyx4d@proton.me">
    <meta property="og:title" content="3D Project Management Tool">
    <meta property="og:description" content="An interactive 3D project management tool built with Three.js.">
    <meta property="og:image" content="https://office3d.xyz/3D_Project_Management_Tool/images/preview.png">
    <meta property="og:url" content="https://office3d.xyz/3D_Project_Management_Tool/">
    <meta name="twitter:card" content="summary_large_image">
    <script type="application/ld+json">
    {
        "@context": "http://schema.org",
        "@type": "WebApplication",
        "name": "3D Project Management Tool",
        "description": "An interactive 3D project management tool built with Three.js.",
        "url": "https://office3d.xyz/3D_Project_Management_Tool/",
        "author": {
            "@type": "Person",
            "name": "nyx4d@proton.me"
        }
    }
    </script>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            font-family: Arial, sans-serif;
        }
        #gui {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 10;
        }
        #projectDetails {
            position: absolute;
            bottom: 10px;
            left: 10px;
            background: rgba(255, 255, 255, 0.8);
            padding: 10px;
            border-radius: 5px;
            z-index: 10;
        }
        #shareEmbedButtons {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 10;
        }
        #shareEmbedButtons button {
            margin: 5px;
            padding: 10px 20px;
            background: #333;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        #shareEmbedButtons button:hover {
            background: #555;
        }
        #embedCode {
            width: 100%;
            padding: 5px;
            margin-top: 10px;
            display: block;
        }
        #dropdownMenu {
            position: absolute;
            top: 60px;
            left: 10px;
            background: rgba(255, 255, 255, 0.9);
            padding: 10px;
            border-radius: 5px;
            z-index: 10;
        }
    </style>
</head>
<body>
    <div id="gui"></div>
    <div id="projectDetails">
        <h3 id="projectName"></h3>
        <p id="projectDescription"></p>
        <h4>Tasks:</h4>
        <ul id="taskList"></ul>
        <button onclick="addTask()">Add Task</button>
        <input type="text" id="newTaskName" name="newTaskName" placeholder="Task name">
    </div>
    <div id="shareEmbedButtons">
        <button id="shareButton" onclick="shareProject()">Share</button>
        <button id="embedButton" onclick="generateEmbedCode()">Embed</button>
        <input type="text" id="embedCode" readonly>
    </div>
    <div>
        <button onclick="toggleDropdown()">Help</button>
        <div id="dropdownMenu" style="display: none;">
            <h3>How to Use the App</h3>
            <p>Click on project nodes to view and edit details. Use the GUI controls to customize node appearance. Use voice commands to add new projects.</p>
            <h3>Voice Commands</h3>
            <ul>
                <li>"nyx add project [Project Name]"</li>
                <li>"nyx delete project [Project Name]"</li>
                <li>"nyx list projects"</li>
                <li>"nyx change color of project [Project Name] to [Color]"</li>
                <li>"nyx change opacity of project [Project Name] to [Opacity]"</li>
                <li>"nyx move project [Project Name] to [X] [Y] [Z]"</li>
                <li>"nyx add task to project [Task] to [Project Name]"</li>
                <li>"nyx change background color to [Color]"</li>
                <li>"nyx toggle starfield"</li>
                <li>"nyx toggle nebula"</li>
                <li>"nyx animate starfield"</li>
                <li>"nyx change starfield density to [Density]"</li>
                <li>"nyx change nebula color to [Color]"</li>
            </ul>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.7/dat.gui.min.js"></script>
    <script src="js/app.js"></script>
    <script>
        function toggleDropdown() {
            const dropdownMenu = document.getElementById('dropdownMenu');
            dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
        }

        function generateEmbedCode() {
            const embedCode = `<iframe src="https://office3d.xyz/3D_Project_Management_Tool/index.php" width="800" height="600" frameborder="0" allowfullscreen></iframe>`;
            document.getElementById('embedCode').value = embedCode;
            logAction('embed', embedCode);
        }

        function shareProject() {
            const shareUrl = "https://office3d.xyz/3D_Project_Management_Tool/index.php";
            navigator.clipboard.writeText(shareUrl).then(function() {
                alert('Project URL copied to clipboard');
                logAction('share', shareUrl);
            }, function(err) {
                console.error('Could not copy text: ', err);
            });
        }

        function logAction(action, details) {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "log_action.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send("action=" + action + "&details=" + encodeURIComponent(details));
        }
    </script>
</body>
</html>
