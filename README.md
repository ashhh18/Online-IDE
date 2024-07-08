# Online-IDE Code Editor

This React project creates an online code editor application. It uses the web browser's local storage to keep track of the files and folders. Users can create multiple folders with multiple files inside them. Every file has a name and language. The editor currently provides support for 4 languages : C++, Java, JavaScript, Python.

## Features

- **Multi-Language Support:** Switch between C++, Java, JavaScript, and Python.
- **File Management:** Create multiple folders and files, each with its own name and language.
- **Monaco Editor Integration:** Built on Monaco-editor with a wide variety of themes (currently only 2, but can be extended as required).
- **API Integration:** Uses Rapid API to send the code and stdin to the server using POST, and fetch the result using GET. Currently works on the free subscription model of the API, allowing up to 50 requests a day.
- **Import/Export:** Import and export code files.
- **Download:** Download the code files to your local system.

## Technologies Used

- **Frontend:** React, Monaco Editor
- **API:** Rapid API
- **Backend:** JavaScript

## Steps to run :
Clone the repository then run the following commands :
   ```bash
   git clone https://github.com/your-username/online-ide-code-editor.git
   cd online-ide-code-editor
   npm i
   npm start
