const express = require('express');
const {Client} = require('pg')

// const port = 5432;
const app = express();

const client = new Client({
    host: 'localhost',
    user: 'buddy',
    password: 'brocode',
    host: '45.76.76.242',
    port: '5432'
});

client.connect();

app.get('/data', async(req, res)=>{
    try{
        const result = await client.query('select * from ');
        rows = result.rows;
        
        res.json(rows);
    }
    catch(err)
})