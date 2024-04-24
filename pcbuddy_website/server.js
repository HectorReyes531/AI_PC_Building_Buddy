const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 8005;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Define the route for handling POST requests to /execute_script
app.post('/execute_script', (req, res) => {
    const userInput = req.body.prompt;
    
    // Execute the Python script with the user input as a command-line argument
    exec(`python3 algo.py "${userInput}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Python script encountered an error: ${stderr}`);
            return;
        }
        // Send the output of the Python script back to the client
        res.send(stdout);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
