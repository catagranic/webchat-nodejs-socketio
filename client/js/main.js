

const socket = io.connect('http://10.90.133.72:6677',{'forceNew':true});

socket.on('messages', function(data){
   console.log(data);
   render(data);
});

function render(data){
    var html = data.map(function(message, index){
        return (`
            <div class="message lemon-lime-gradient">
                <strong>${message.nickname}</strong> says:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
    let message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
    document.getElementById('text').value = '';

    return false;
}