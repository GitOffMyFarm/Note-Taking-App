const fs = require('fs');
const express = require('express');
const { nanoid } = require('nanoid/non-secure');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
app.get('/api/notes', (req, res) => {
    let db;
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        error ? console.error(error) : db = data
        console.log(data);
        res.json(JSON.parse(db));
    });
});
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = nanoid();
    console.log(newNote);
    const fileData = JSON.parse(fs.readFileSync('./db/db.json'));
    fileData.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(fileData, null, 2));
});
app.listen(PORT, () => console.log(`You are now live at Port:${PORT}`));