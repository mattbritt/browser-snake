

const joinGame = document.getElementById('joinGame');
const createGame = document.getElementById('createGame');

let socket = io();

socket.on('joined', (id) => {
  console.log(id + " joined");
})

function create(e) {
  socket.emit('createGame', document.querySelector('#gamename').value);
  e.stopPropagation();
};
function join(e) {
  console.log('clickd')
  socket.emit('joinGame', document.querySelector("#gameid").value);
  e.stopPropagation();
}
createGame.addEventListener('click', create);
joinGame.addEventListener('click', join);

const emitbtn = document.querySelector("#emitbtn");
emitbtn.addEventListener('click', (e) => {
  socket.emit('emitting', document.querySelector("#emit").value);
  e.preventDefault();
  e.stopPropagation();
})