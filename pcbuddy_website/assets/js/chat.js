// easy way to keep track of document classes/ids
const messageBar = document.querySelector(".bar-wrapper input");
const messageBox = document.querySelector(".message-box")
const send = document.querySelector(".bar-wrapper button");

// keeps track of API keys rather than having us writing them in the line
const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";

// function to send a message to the chat bot
function sendMessage(){
    // checks if the user input any message
    if (messageBar.value.length > 0) {
        console.log("message sent");
        // populates user messages by appending a string to the html
        let user =
            `<div class="user-message">
        <img src = "images/pic01.jpg" class="chatimg">
        <span>
            ${messageBar.value}
        </span>
    </div>`
        // populates the bot's responses in a similar way to the user messages
        let bot =
            `<div class="chat-response">
        <img src ="images/sunset.jpg" class="chatimg">
        <span class="new">
            . . .
        </span>
    </div>`
    // storing the messages value
    var k = messageBar.value;
    console.log(k);
        // const message = document.createElement('div');
        // message.classList.add('user-message');
        // message.textContent(messageBar.value);

        // inserting the user's message into the chat
        messageBox.insertAdjacentHTML("beforeend", user);
        // document.getElementById("user-input").value = '';

        // add a delay for the bot's reply to make it seem like it's actually thinking
        setTimeout(() => {
            messageBox.insertAdjacentHTML("beforeend", bot);
        
            console.log(messageBar.value);
            // call open api's ai and requests a response based on the gpt-3.5 model
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
            // get response and convert it to json so we can format
            }).then(res => res.json())
            .then(data=>{
                console.log(data);
                // console.log(messageBar.value);
                console.log(k);
                // take the response which is the first element of array
                const BotResponse = document.querySelector(".chat-response .new");
                BotResponse.innerHTML = data.choices[0].message.content;
                BotResponse.classList.remove("new");
            }).catch(error => {
                console.log("why doesn't it work????????????????");
                BotResponse.innerHTML = "ERROR bot has not accounted for this type of question.";
            });

        }, 100);
    }
    // clears the message bar
    document.getElementById("user-input").value = '';
}
// handles clicking the submit button
send.onclick = sendMessage;
// handles the enter keypress to submit
messageBar.addEventListener('keypress', function(e){
    if(e.key == 'Enter'){
        sendMessage();
    }
})