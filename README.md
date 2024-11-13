# 3D-Art-Gallery
A 3D rotating gallery built with Three.js, featuring interactive artwork images with titles and descriptions. Users can click arrows to navigate through the gallery, where each image rotates to the center position in front of the camera.

## Features
- 3D Art Display: Six artworks displayed on a rotating gallery, with each image moving to the front upon clicking.
-  Reflection and Lighting Effects: Includes a reflective floor and spotlight to enhance the visual experience.
- Interactive Navigation: Left and right arrow buttons to rotate the gallery.
- Image Details: Each image displays a title and description that fade in and out as new images come to the center.

## Technologies Used
- Three.js: Renders the 3D environment and interactive elements.
- JavaScript: Handles gallery animations and interactions.
- Tween.js: Smooth transitions between gallery items.
- HTML/CSS: Basic layout and styling for the page.
  
## Installation
### Clone the repository:

- Go into command line
- git clone https://github.com/yourusername/3d-art-gallery.git
- cd 3d-art-gallery
- Install dependencies:
- You may need to set up a local server to view the project. Using Node.js, install the following:

  ### In command line
- npm install three
- npm install tween
- Run the Project:
- Start a local server (you can use tools like http-server for Node.js):

  ### In command line
- npx http-server .
- View the Project:
- Open a browser and go to http://localhost:8080 (or the port provided by your server).

- <picture>
 <source media="(prefers-color-scheme: dark)" srcset="YOUR-DARKMODE-IMAGE">
 <source media="(prefers-color-scheme: light)" srcset="YOUR-LIGHTMODE-IMAGE">
 <img alt="YOUR-ALT-TEXT" src="C:\Users\jared\OneDrive\Pictures\3D Art Gallery.PNG">
</picture>
