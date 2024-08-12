# MERN-Image-extractor

Project Overview: HTTP Status Code Image Search and Save Application
This project is a web application that allows users to search for images corresponding to HTTP status codes and save the results as a list. The application is built using React and Axios, and it offers an intuitive interface for searching, viewing, and saving images related to various HTTP status codes.

❖ Key Features:

Search Functionality:
Users can input a specific HTTP status code or a pattern (using x as a wildcard) to search for corresponding images.
The application fetches images from the http.dog website based on the provided status code.
If an image is not found or a CORS (Cross-Origin Resource Sharing) issue occurs, the error is handled gracefully, and a message is logged in the console.

Image Display:
Successfully fetched images are displayed in a grid layout, providing users with a clear view of the results.
Each image is displayed with an HTTP status code, giving users a visual representation of the status.

List Saving:
Users can assign a name to the search results and save the list for future reference.
The saved list includes the HTTP status codes and corresponding image links.
Data is saved to a backend server via an API call using Axios.

Error Handling:
The application includes robust error handling to manage scenarios where images are not found or network issues occur.
Users are notified if an image corresponding to a search query is unavailable, ensuring a smooth user experience.

Technical Stack:
Frontend: React for building the user interface, CSS for styling, and Axios for handling HTTP requests.
Backend: The project assumes a backend API (e.g., using Node.js/Express) to save the list of images and related data.
Design: The UI is designed to be user-friendly with responsive input fields, buttons, and a grid layout for image display. Loader animations enhance the visual appeal during the image-fetching process.

❖ Video link ---- https://drive.google.com/file/d/1Vol3fiXWgzSyV2ksqDeHYf7dt9VeBRlE/view

❖ Deployed link --- https://doggypi-frontend.onrender.com

❖ Credentials :- demo@gmail.com | demo123
