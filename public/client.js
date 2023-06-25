const socket = io();

let name = prompt("enter your name")
let textarea = document.querySelector('#textarea');

let messageArea = document.querySelector('.message__area');

textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        console.log(e.target.value);
        sendMessage(e.target.value);
    }
})

//  * create a function name send message with a paramater named message
function sendMessage(message){
    let msg = {
        user:name,
        message:message
    }

    // append message to DOM
    appendMessage(msg,'outgoing')


    //* Send message to the server
    socket.emit('message',msg)
}

function appendMessage(msg,type) {
    let mainDiv = document.createElement('div');
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv);
}



// Recieve messages
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scrollToBottom( );
})


function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}
