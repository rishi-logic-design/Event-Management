const socketIo = require('socket.io');

let io;

const initSocket = (server) => {
    io = socketIo(server);
    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
    cors = {
        origin: '*',
    };
};

const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};

module.exports = { initSocket, getIo };