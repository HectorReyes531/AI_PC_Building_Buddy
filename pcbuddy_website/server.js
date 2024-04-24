const http = require('http');
const { spawn } = require('child_process');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/execute_script') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            const userInput = JSON.parse(data).prompt;
            const pythonProcess = spawn('python', ['algo.py'], { shell: true });
            let responseData = '';

            pythonProcess.stdout.on('data', (chunk) => {
                responseData += chunk;
            });

            pythonProcess.on('close', (code) => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(responseData);
            });

            pythonProcess.stdin.write(userInput);
            pythonProcess.stdin.end();
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
