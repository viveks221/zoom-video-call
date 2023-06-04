const express= require('express');
const app = express();
const server= require('http').createServer(app);
const {v4:uuid}= require('uuid')
const io = require('socket.io')(server)
const {ExpressPeerServer} = require('peer');
const peerServer= ExpressPeerServer(server,{
    debug : true
});

app.set('view engine','ejs')
app.use(express.static('public'));
app.use('/peerjs',peerServer)

app.get('/', (req,res)=>{
    res.redirect(`/${uuid()}`)
})


app.get('/:room', (req,res)=>{
    res.render('room',{roomId:req.params.room})
})


io.on('connection',socket => {
    socket.on('join-room',(roomId,userId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected',userId)
    })
})







server.listen(3030);

