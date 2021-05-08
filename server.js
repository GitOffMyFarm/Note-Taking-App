//NPM dependencies as variables, nanoid as a function to give each object a unique ID
const fs = require('fs');
const express = require('express');
const app = express();
const { nanoid } = require('nanoid/non-secure');
//sets us up for requests
const path = require('path');
const PORT = process.env.PORT || 3000;
//Allows us to use CSS and frontend javascript on our app
app.use(express.static(__dirname + '/public'));
//next two lines help with JSON parsing and makes transfer of objects possible
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//get request sending index.html as our main page when no path is defined
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
//when notes is at the end of the url sends you to notes.html static page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
//db.json file filled with our objects and sends it to our front end for them to use via end path
app.get('/api/notes', (req, res) => {
    let db;
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
        error ? console.error(error) : db = data
        //console.log(data);
        res.json(JSON.parse(db));
    });
});
//allows users to post objects with the front and and catches them and writes them to our file here
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = nanoid();
    console.log(newNote);
    const fileData = JSON.parse(fs.readFileSync('./db/db.json'));
    fileData.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(fileData, null, 2));
    res.end();
});
//Deletes note based on ID of icon clicked on front end
app.delete('/api/notes/:note', (req, res) => {
    const deleteNote = req.params.note;
    console.log(deleteNote);
    const fileData = JSON.parse(fs.readFileSync('./db/db.json'));
    for (i = 0; i < fileData.length; i++) {
        if (fileData[i].id === deleteNote) {
            fileData.splice(i, 1);
            fs.writeFileSync('./db/db.json', JSON.stringify(fileData, null, 2));
        }
    }
    res.end();
});
//Port listener, makes the app go live
app.listen(PORT, () => console.log(`You are now live at Port:${PORT}`));