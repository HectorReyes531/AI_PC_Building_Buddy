// covers search bar and its value
const searchBar = document.querySelector(".search")
// api information
const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";

const api = "localhost:5000/data"

// event that triggers when the search bar encounters an action
document.getElementById("searchform").addEventListener("submit", function(event){
    // prevent search bar from reloading
    event.preventDefault();
    // get the value from search bar to query baed off of
    var res = document.getElementById("searchinput").value;
    res.value += " itemize every PC component.";
    console.log(res)
    // set a small delay
    setTimeout(() => {
        console.log(res);
        // fetch openai's api
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": res}]
            })
        }).then(response => response.json())
        .then(data => {
            // log data and then parse based on new lines as well as olons
            // console.log(data)
            var text = data.choices[0].message.content;
            // console.log(text);
            var items = text.split('\n').filter(line => line.includes(':')).map(line=>line.trim());
            // console.log(items);
            // create a table to poupulate the items
            var table = document.getElementById('compitems');
            table.innerHTML = '';
            // for every item split the part and name from previous parse and remove white space
            items.forEach(item =>{
                var [partName, brandName] = item.split(':');
                partName = partName.trim();
                brandName = brandName.trim();
                
                var row = table.insertRow();
                // append rows accordingly, still have 
                var part_cell = row.insertCell(0);
                var brand_cell = row.insertCell(1);
                var price_cell = row.insertCell(2);
                var link_cell = row.insertCell(3);

                part_cell.innerHTML = partName;
                brand_cell.innerHTML = brandName;
                price_cell.innerHTML = 'N/A';
                link_cell.innerHTML = 'N/A';
            }).catch(error => {
                console.log("no response from openai");
            })
    }, 100);
})})
