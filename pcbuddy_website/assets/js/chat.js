const messageBar = document.querySelector(".bar-wrapper input");
const messageBox = document.querySelector(".message-box")
const send = document.querySelector(".bar-wrapper button");


send.onclick = function(){
    if(messageBar.value.length > 0){
        console.log("message sent");
        let str = 
    `<div class="user-message">
        <img src = "images/pic01.jpg" class="chatimg">
        <span>
            ${messageBar.value}
        </span>
    </div>`
    // const message = document.createElement('div');
    // message.classList.add('user-message');
    // message.textContent(messageBar.value);
    messageBox.insertAdjacentHTML("beforeend", message);
    document.getElementById("user-input").value = '';

    }
}