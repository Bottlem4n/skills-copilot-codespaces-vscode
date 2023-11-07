//Create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var multer = require('multer');
var upload = multer();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'comments'
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

//Create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE comments';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Database created...');
    });
});

//Create table
app.get('/createcomments', (req, res) => {
    let sql = 'CREATE TABLE comments(id int AUTO_INCREMENT, name VARCHAR(255), comment VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Comments table created...');
    });
});

//Insert comment
app.post('/comment', (req, res) => {
    let comment = { name: req.body.name, comment: req.body.comment };
    let sql = 'INSERT INTO comments SET ?';
    let query = db.query(sql, comment, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send('Comment added...');
    });
});

//Get all comments
app.get('/comments', (req, res) => {
    let sql = 'SELECT * FROM comments';
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
        res.send(results);
    });
});

//Get single comment
app.get('/comment/:id', (req, res) => {
    let sql = `SELECT * FROM comments WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) =>