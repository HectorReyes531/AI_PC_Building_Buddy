document.getElementById("submitBtn").addEventListener("click", async function(){

    const part = document.getElementById("part-type").value;
    console.log(part);
    const url = `http://localhost:3000?part=${part}`;
    const response = await fetch(`${url}`);
    const data = await response.json();
    console.log(typeof(data));
    console.log(data);
})