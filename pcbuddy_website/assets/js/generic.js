const searchBar = document.querySelector(".search")

const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";

document.getElementById("searchform").addEventListener("submit", function(event){
    event.preventDefault();
    var res = document.getElementById("searchinput").value;
    console.log(res)
    setTimeout(() => {
        console.log(res);
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": k}]
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }, 100)
})
