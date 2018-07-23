module.exports = (io) => {
  io.on('connection', function (socket) {
    socket.emit('notif', { hello: 'world' });
  })
}