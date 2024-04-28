const express = require('express');
const { Client } = require('pg')


const port = 5432;
const app = express();

// const client = new Client({
//     host: 'localhost',
//     user: 'buddy',
//     password: 'brocode',
//     host: '45.76.76.242',
//     port: '5432'
// });
const client = new Client({
    user: 'buddy',
    password: 'brocode',
    host: '45.76.76.242',
    database: 'pcbuilderdatabase',
    port: '5432'
    // ssl: true
})
// gets all table names
// const search = `
//     SELECT table_name 
//     FROM information_schema.tables 
//     WHERE table_schema = 'pc_parts';
// `
client.connect().then(() => {
    console.log("connected to Postgresql Database")
    // need to query from pc_parts schema
    // i.e. SELECT * from pc_parts.os
    const search = `SELECT * from pc_parts.os`;
return client.query(search);
}).then(result =>{

    console.log('OS:');
    result.rows.forEach(row=>{
        console.log(row);
    })
    client.end();
    process.exit();
}).catch(error => {
    console.error('Error connecting to PostgreSQL database:', error);
});


// console.log("abcnsdklasnld")

// app.get('/data', async(req, res)=>{
//     try{
//         console.log('get data');
//         const result = await client.query('select * from cpu');
//         console.log("result: ", result);
//         rows = result.rows;

//         res.json(rows);
//     }
//     catch(err)
//     {
//         console.error(err);
//     }
// });

// app.use(express.static('public'));

app.listen(port, () => {
    console.log(port);
    console.log(`Server connected to port ${port}`);
});
