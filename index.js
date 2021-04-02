const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid'); //to get unique ID's for notes

//to serve static files
app.use(express.static('public'));

//to parse body for post request
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); //setting ejs for templating
app.set('views', path.join(__dirname + '/views')); 

/* FAKE DATABASE for testing*/
let data = [
    {
        id: uuid(),
        subject: "Math",
        title: "Calc",
        className: "Calc 1",
        content: "Math is Fun"
    },
    {
        id: uuid(),
        subject: "Physics",
        title: "Quantum",
        className: "Calc 1",
        content: "Math is Fun"
    },    
    {
        id: uuid(),
        subject: "Stats",
        title: "conditional",
        className: "Calc 1",
        content: "Math is Fun"
    },
    {
        id: uuid(),
        subject: "Environment",
        title: "Pollution",
        className: "Calc 1",
        content: "Math is Fun"
    }
];
//route for home page
app.get('/', (req, res) => {
    res.render('landing');
})
//route for create note page
app.get('/new', (req, res) => {
    res.render('createNote');
})
//route for viewing notes
app.get('/notes', (req, res) => {
    res.render('viewNotes', {data});
})

/* TODO */
//To post new Note
app.post('/notes', (req, res) => {
const {subject, title, className, content} = req.body;
data.push({id: uuid(), subject, title, className, content})
res.redirect('/notes');
})
//route for note details
app.get('/notes/:id', (req, res) => {
const {id} = req.params;
const noteDetail = data.find(c => c.id === id);
res.render('viewDetail', {noteDetail});
})
//when nothing matches route
app.get('/*', (req, res) => {
    res.render('pageNotFound');
})
//listener
app.listen(3000, () => {
    console.log("LISTENING on port 3000");
})

