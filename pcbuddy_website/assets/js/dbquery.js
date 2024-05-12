// On a click event retrieve part
document.getElementById("submitBtn").addEventListener("click", async function(){
    // get the part type
    const part = document.getElementById("part-type").value;
    console.log(part);
    // connect to endpoint with the part on the link and fetch 
    const url = `http://localhost:3000?part=${part}`;
    const response = await fetch(`${url}`);
    const data = await response.json();
    // console.log(typeof(data));
    console.log(data);
    // get data and create table
    const table = document.getElementById("data_rep");
    table.innerHTML = '';

    // Creating a header for the table
    const headerRow = table.insertRow();
    Object.keys(data[0]).forEach(key=>{
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    })
    // Populating the table
    console.log("inserting cells");
    data.forEach(entry =>{
        const row = table.insertRow();
        Object.values(entry).forEach(value =>{
            const cell = row.insertCell();
            cell.textContent = value;
        })
    })
})