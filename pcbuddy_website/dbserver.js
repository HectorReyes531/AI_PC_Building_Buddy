// Necessary packages to create a server client connection
const express = require('express');
const { Client } = require('pg')
const cors = require('cors');

// open port
const port = 3000;
const app = express();

app.use(cors());

// const client = new Client({
//     host: 'localhost',
//     user: 'buddy',
//     password: 'brocode',
//     host: '45.76.76.242',
//     port: '5432'
// });

// connected to the database
const client = new Client({
    user: 'buddy',
    password: 'brocode',
    host: '45.76.76.242',
    database: 'pcbuilderdatabase',
    port: '5432'
    // ssl: true
})

client.connect();

// retrieving information from the database based on a certain part
app.get('/', async (req, res)=> {
    // console.log("query");
    //res.send("dfsdfs");
    const part = req.query.part;
    console.log(part);
    // const part = 'os';
    try{
        const result = await client.query(`SELECT * FROM pc_parts."${part}"`);
        res.json(result.rows);
    }catch(error){
        console.error('error executing query', error);
        res.status(500).send('Internal Server Error');
        console.log("couldn't return");
    }
});


// gets all table names
// const search = `
//     SELECT table_name 
//     FROM information_schema.tables 
//     WHERE table_schema = 'pc_parts';
// `

// client.connect().then(() => {
//     console.log("connected to Postgresql Database")
//     // need to query from pc_parts schema
//     // i.e. SELECT * from pc_parts.os
//     const search = `SELECT * from pc_parts.os`;
// return client.query(search);
// }).then(result =>{

//     console.log('OS:');
//     result.rows.forEach(row=>{
//         console.log(row);
//     })
//     client.end();
//     process.exit();
// }).catch(error => {
//     console.error('Error connecting to PostgreSQL database:', error);
// });


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
