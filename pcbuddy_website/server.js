const http = require('http');
const { exec } = require('child_process');
const qs = require('querystring');

const PORT = process.env.PORT || 8004;

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/execute_script') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const userInput = qs.parse(body).prompt;
            exec(`python3 algo.py "${userInput}"`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing Python script: ${error}`);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal server error' }));
                } else {
                    console.log(`Python script output: ${stdout}`);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ response: stdout }));
                }
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
