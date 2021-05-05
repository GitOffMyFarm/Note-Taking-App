const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
//const db = require('./db/db.json')

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
//app.get('/api/notes', (req, res) => {
    //res.json(path.join(db))});
app.listen(PORT, () => console.log(`You are now live at Port:${PORT}`));