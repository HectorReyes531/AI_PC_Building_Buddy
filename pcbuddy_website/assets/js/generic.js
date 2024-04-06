const searchBar = document.querySelector(".search")

const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";

document.getElementById("searchform").addEventListener("submit", function(event){
    event.preventDefault();
    var res = document.getElementById("searchinput").value;
    // console.log(res)
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
                "messages": [{"role": "user", "content": res}]
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            var text = data.choices[0].message.content;
            console.log(text);
            var items = text.split('\n').filter(line => line.includes(':')).map(line=>line.trim());
            console.log(items);

            var table = document.getElementById('compitems');
            table.innerHTML = '';
            items.forEach(item =>{
                var [partName, brandName] = item.split(':');
                partName = partName.trim();
                brandName = brandName.trim();
                
                var row = table.insertRow();

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
