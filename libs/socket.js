let socketIO = require('socket.io');


function socket(server) {
  let io = socketIO(server);

  io.on('connection', function (socket) {
	  console.log('is conect');
    socket.emit('message', 'hello diar user', function(response) {
      console.log("delivered", response);
    });

    // socket.on('', () => {...});

    socket.broadcast.emit('welcome', `user  connected!`);
  });
}
module.exports = socket;
