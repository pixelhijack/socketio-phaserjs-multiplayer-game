var socket = require('./socket.js');

window.onload = function(){
    
    socket.on('connect', function () {
      console.log('[CLIENT] on:connect', arguments);
      addLine('[CLIENT] connected');
    });
    
    socket.on('message', function (msg) {
      console.log('[CLIENT] on:message', arguments);
      addLine('[CLIENT] message: \n' + msg);
    });
    
    var input = document.getElementById('message');
    
    input.addEventListener('change', function(e){
      socket.emit('message', e.target.value);
      input.value = '';
    });
    
    // socket.emit('identify', $scope.name);
    // socket.emit('message', $scope.text);
};
    
function addLine(content){
    var el = document.createElement('div');
    el.innerHTML = content;
    document.getElementById('content').appendChild(el);
}