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

app.get('/:user/otp/:token', (req, res, next) => {
    optsModel.checkString(req.params.user, req.params.token, (result) => {
        if (result.status) {
            io.to(result.content).emit('authenticated');
        }

        return res.status(200).json({
            status: true
        });
    });
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
