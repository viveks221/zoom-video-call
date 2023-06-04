
const socket = io('/')
const videGrid= document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted=true;
let myVideoStream;

var peer = new Peer(undefined,{
    path : '/peerjs',
    host: '/',
    port: '3030'
});

const addVideoStream = (video,stream) =>{
    video.srcObject= stream;
    video.addEventListener('loadedmetadata',() =>{
        video.play();
    })
    videGrid.append(video)
    
}

const connectToNewUser = (userId,stream) => {
    const call = peer.call(userId,stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
    addVideoStream(video,userVideoStream)
    })

}

peer.on('open', id => {
    socket.emit('join-room',ROOM_ID, id);
})

navigator.mediaDevices.getUserMedia({
    video:true,
    audio :false
}).then(stream =>{
    myVideoStream = stream
    addVideoStream(myVideo,stream);

    socket.on('user-connected',(userId) => {
        console.log(userId)
        connectToNewUser(userId,stream);
    })


    peer.on('call',call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream',userVideoStream => {
            addVideoStream(video,userVideoStream)
        })
    })



})









