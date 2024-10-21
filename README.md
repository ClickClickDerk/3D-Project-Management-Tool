# 3D Project Management Tool

An interactive 3D project management tool built with Three.js, allowing you to visualize, manage, and interact with your projects in a 3D environment.

## Features
- 3D workspace for organizing projects
- Project nodes with details and tasks
- Drag-and-drop functionality
- Voice commands for adding projects
- Customizable GUI controls
- Advanced lighting and background effects

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/ClickClickDerk/3D-Project-Management-Tool.git
    cd 3D-Project-Management-Tool
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the local server:
    ```sh
    node server.js
    ```

4. Open your browser and go to `http://localhost:3000`.

## Usage
- Click on project nodes to view and edit details.
- Use the GUI controls to customize node appearance.
- Use voice commands to add new projects (e.g., "add project Project Name").

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the following custom license:

```markdown
# Custom License for 3D Project Management Tool

© 2024 nyx4d
Contact: nyx4d@proton.me

## Permissions
- Use: Permission is granted to use this software for personal and commercial purposes.
- Modify: Permission is granted to modify the software.
- Distribute: Permission is granted to distribute the software, provided that the conditions below are met.

## Conditions
- Attribution: You must give appropriate credit, provide a link to this license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
- Share Alike: If you modify the software, you must include a prominent notice stating that you have made changes, and you must share those modifications under the same or compatible license as this one.
- Non-Commercial: The software may not be used for commercial purposes without explicit permission from the author.
- Ethical Use: The software shall not be used for any purpose that is illegal, unethical, or harmful, except in rare cases where the unethical use is justified for positive change and for the benefit of the people. Such cases must be approved by the author.

## Limitations
- Liability: The software is provided "as is", without any warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

## Termination
- This license is in effect until terminated. The author reserves the right to terminate this license if the conditions are violated.
- Upon termination, you must destroy all copies of the software in your possession.

Unauthorized use of this software without a valid license from nyx4d@proton.me is strictly prohibited. Email me and let's work together!

### Using Voice Commands

Voice commands allow you to interact with the tool hands-free. The tool uses the Web Speech API for voice recognition.

- **Supported Commands:**
  - **"Add project [Project Name]"**: Creates a new project node with the specified name.
    - Example: "Add project New Website"
  - **"Delete project [Project Name]"**: Deletes the project node with the specified name.
    - Example: "Delete project New Website"
  - **"List projects"**: Lists all project nodes in the console.
    - Example: "List projects"
  - **"Change color of project [Project Name] to [Color]"**: Changes the color of the specified project node.
    - Example: "Change color of project New Website to blue"
  - **"Change opacity of project [Project Name] to [Opacity]"**: Changes the opacity of the specified project node.
    - Example: "Change opacity of project New Website to 0.5"
  - **"Move project [Project Name] to [X] [Y] [Z]"**: Moves the specified project node to the given coordinates.
    - Example: "Move project New Website to 10 15 20"
  - **"Add task to project [Task] to [Project Name]"**: Adds a task to the specified project node.
    - Example: "Add task to project Complete documentation to New Website"

- **Background Manipulation Commands:**
  - **"Change background color to [Color]"**: Changes the background color.
    - Example: "Change background color to black"
  - **"Toggle starfield"**: Toggles the visibility of the starfield.
  - **"Toggle nebula"**: Toggles the visibility of the nebula.
  - **"Animate starfield"**: Starts animating the starfield.
  - **"Change starfield density to [Density]"**: Changes the density of the starfield.
    - Example: "Change starfield density to 5000"
  - **"Change nebula color to [Color]"**: Changes the color of the nebula.
    - Example: "Change nebula color to 0.8"

- **Using Voice Commands:**
  1. Ensure your microphone is connected and enabled.
  2. Click the "Start Voice Commands" button (if implemented) or simply start speaking if the recognition is always on.
  3. Speak the command clearly.
  4. Check the console or the 3D space for the result of the command.
