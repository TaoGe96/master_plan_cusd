const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

//#region pg database
const { Client } = require('pg');
const client = new Client({
    connectionString: "postgres://tyfjkswuckqrdk:66854375fc36f3ba67eb0dc909d873d6deaf72eb75bfd3be019da8186c0cad5d@ec2-54-146-4-66.compute-1.amazonaws.com:5432/d5t8rj8ufkgc22",
    ssl: {
        rejectUnauthorized: false
    }
});


//#endregion

app.listen(process.env.PORT || 3000, () => {
    console.log('listening...');
})


app.get("/", (req, res) => {
    res.sendFile(__dirname + "index.html")
})

app.get("/database", (req, res) => {

    let datas = []
    let fields = []
    client.connect();
    let sqlString = 'select iname as Name, iprice as Price from items;'
    client.query(sqlString, (err, reply) => {
        if (err) throw err;
        // console.log(res);
        for (const field of reply.fields) {
            fields.push(field)
        }
        for (const row of reply.rows) {
            datas.push(row);
        }
        res.render('database', {
            tableContents: datas,
            tableHeaders: fields,
        });
        console.log(datas);

    });


})

app.post("/", (req, res) => {
    console.log(req.body.elementName);
    res.redirect('/database')
})