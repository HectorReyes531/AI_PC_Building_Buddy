const messageBar = document.querySelector(".bar-wrapper input");
const messageBox = document.querySelector(".message-box")
const send = document.querySelector(".bar-wrapper button");

const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";

send.onclick = function () {
    if (messageBar.value.length > 0) {
        console.log("message sent");
        let user =
            `<div class="user-message">
        <img src = "images/pic01.jpg" class="chatimg">
        <span>
            ${messageBar.value}
        </span>
    </div>`
        let bot =
            `<div class="chat-response">
        <img src ="images/sunset.jpg" class="chatimg">
        <span class="new">
            what
        </span>
    </div>`
    var k = messageBar.value;
    console.log(k);
        // const message = document.createElement('div');
        // message.classList.add('user-message');
        // message.textContent(messageBar.value);
        messageBox.insertAdjacentHTML("beforeend", user);
        // document.getElementById("user-input").value = '';

        setTimeout(() => {
            messageBox.insertAdjacentHTML("beforeend", bot);
        
            console.log(messageBar.value);
            fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    "model": "gpt-3.5-turbo",
                    "messages": [{ "role": "user", "content": k}],
                    "temperature": 0.7
                })

            }).then(res => res.json())
            .then(data=>{
                console.log(data);
                // console.log(messageBar.value);
                console.log(k);
                const BotResponse = document.querySelector(".chat-response .new");
                BotResponse.innerHTML = data.choices[0].message.content;
                BotResponse.classList.remove("new");
            }).catch(error => {
                console.log("Shibal doesn't work");
                BotResponse.innerHTML = "Another cancerous error";
            });

        }, 100);
    }
    document.getElementById("user-input").value = '';
}