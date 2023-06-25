const express = require('express');
const {Socket} = require('socket.io')
const app = express();

// Create the server


// Write a get route to load the index.html on home route

const http = require('http').createServer(app);
app.use(express.static(__dirname + '/public'))

app.get('/', (req,res)=> {
    res.sendFile(__dirname,'/index.html')
})

http.listen(3000,()=>{
    console.log('Listening to port 3000')
})

// Socket code

const io = require('socket.io')(http);

io.on('connection',(socket)=>{
    console.log('connection');
    
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})