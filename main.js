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

app.get('/:username/otp/:token', (req, res, next) => {
    let result = otpsData.checkOtp(req.params.token);

    if (result) {
        io.to(result).emit('authenticated');
    }

    return res.status(200).json({
        status: true
    });
});

io.on('connection', (socket) => {
    socket.emit('accepted');

    socket.on('otp', () => {
        socket.emit('otp', { token: otpsData.newOtp(socket.id) });
    });
});

server.listen(5000,() => {
    console.log('http://localhost:5000/');
    io.listen(server);
});
