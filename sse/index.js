const express = require('express');
const http = require('http');
const app = express();
const httpServer = http.createServer(app);

let clients = [];
app.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const clientId = Date.now();
    clients.push({
        clientId,
        res
    });

    const sse = (req, res, next) => {
        res.status(200).write(JSON.stringify({
            status: true,
            timestamp: Date.now()
        }));
    };


    res.status(200).write(JSON.stringify({
        status: false,
        timestamp: Date.now()
    }));

    setInterval(() => sse(req, res, next), 2000);
});

httpServer.listen(5000, () => {
    console.log('http://localhost:5000/');
});