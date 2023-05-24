const http = require('http');
const app = require('express')();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server({
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const otpsData = require('./data/otps.data');
const optsModel = require('./data/opts.model');

app.get('/:token', (req, res, next) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const sse = (req, res, next) => {
        optsModel.checkString(req.params.token, (result) => {
            if (result.status) {
                res.status(200).write(`data: ${JSON.stringify({
                    status: true,
                    timestamp: Date.now()
                })}\n\n`);
            } else  {
                res.status(200).write(`data: ${JSON.stringify({
                    status: false,
                    timestamp: Date.now()
                })}\n\n`);
            }
        });
    }

    setInterval(() => sse(req, res, next), 10000);
});

io.on('connection', (socket) => {
    socket.emit('accepted');

    socket.on('otp', () => {
        optsModel.newString(socket.id, (result) => {
            socket.emit('otp', { token: result.status ? result.token : null });
        });
    });
});

server.listen(5000,() => {
    console.log('http://localhost:5000/');
    io.listen(server);
});
