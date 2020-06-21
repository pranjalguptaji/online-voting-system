const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var cors = require('cors');

var app = express();
//Configuring express server
//app.use(bodyparser.json());

app.use(cors());

app.use(bodyparser.urlencoded({
    extended: true
  }));

app.use(bodyparser.json());

//var urlencodedParser = bodyparser.urlencoded({ extended: false });

console.log("entered");
//MySQL details
var mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Babita@15',
    database: 'users',
    multipleStatements: true
    });

mysqlConnection.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3308;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Creating GET Router to fetch all the learner details from the MySQL Database
app.get('/users' , (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    mysqlConnection.query('SELECT * FROM userdetails', (err, rows, fields) => {
    if (!err)
    {
        res.send(rows);
        console.log(rows);
    }
    else
    console.log(err);
    })
    } );

app.get('/getvotes' , (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    mysqlConnection.query('SELECT * FROM votes', (err, rows, fields) => {
    if (!err)
    {
        res.send(rows);
        console.log(rows);
    }
    else
    console.log(err);
    })
    } );

//Router to GET specific learner detail from the MySQL database
app.get('/users/:id' , (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    mysqlConnection.query('SELECT * FROM userdetails WHERE id = ?',[req.params.id], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );

app.get('/getvotesbyuser/:id' , (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    uid=parseInt(req.params.id);
    mysqlConnection.query('SELECT * FROM votes WHERE uid = ?',[uid], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );

app.post('/adduser', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    console.log(req.body);
    mysqlConnection.query('INSERT INTO userdetails (Name, Username, Password, Language) VALUES (?,?,?,?)',[req.body.name,req.body.email,req.body.passwd,req.body.lang], (err) => {
        if(!err)
        {
            console.log("Successfully inserted");
            res.send({"code":"SUCCESS"});
        }
        else
        {
            //console.log(err);
            res.send(err);
        }
    })
    } )

app.post('/addpost', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    mysqlConnection.query('INSERT INTO postdetails (Title, Category, Date_time, Author, Statement) VALUES (?,?,?,?,?)',[req.body.title,req.body.category,req.body.date_time,req.body.author,req.body.statement], (err) => {
        if(!err)
        {
            console.log("Successfully inserted");
            res.send({"code":"SUCCESS"});
        }
        else
        {
            //console.log(err);
            res.send(err);
        }
    })
    } )

app.post('/addvotes', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    if(req.body.vote=="UP")
    {
        mysqlConnection.query('INSERT INTO votes (uid, pid, upvote, downvote) VALUES (?,?,1,0)',[req.body.uid,req.body.pid], (err) => {
            if(!err)
            {
                console.log("Successfully upvoted");
                res.send({"code":"upvoted"});
            }
            else
            {
                //console.log(err);
                res.send(err);
            }
        })
    }
    else
    {
        mysqlConnection.query('INSERT INTO votes (uid, pid, upvote, downvote) VALUES (?,?,0,1)',[req.body.uid,req.body.pid], (err) => {
            if(!err)
            {
                console.log("Successfully downvoted");
                res.send({"code":"downvoted"});
            }
            else
            {
                //console.log(err);
                res.send(err);
            }
        })
    }
})
    

app.get('/getposts' , (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        mysqlConnection.query('SELECT * FROM postdetails', (err, rows, fields) => {
        if (!err)
        {
            res.send(rows);
            console.log(rows);
        }
        else
        console.log(err);
        })
        } );