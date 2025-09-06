const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

let dataPersons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

function generateID() {
    return Math.floor(Math.random() * 999999999999);
}

morgan.token('body', (req)=> {
    return JSON.stringify(req.body);
})

const mwMorganPost = ':method :url :status :res[content-length] - :response-time ms :body';
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

app.get('/api/persons', (req, res) => {
    res.json(dataPersons);
})

app.get('/info', (req, res) => {
    const persons = [...dataPersons];
    const formatDate = `${new Date().toDateString()} ${new Date().toTimeString()}`
    const info = `<p>Phonebook has info for ${persons.length} people</p><p>${formatDate}</p>`;

    res.send(info);
})

app.get('/api/persons/:id', (req, res) => {
    const { id } = req.params;
    const persons = [...dataPersons];
    const person = persons.find(p => p.id.toString() === id);

    if (!person) {
        res.status(404).json({ error: 'The phone number was not found' });
        return;
    }

    res.json(person);
})

app.delete('/api/persons/:id', (req, res) => {
    const { id } = req.params;
    const persons = [...dataPersons];
    let changePersons = persons.filter(p => p.id.toString() !== id);
    
    if (changePersons.length === persons.length) {
        res.status(400).json({ error: "The request is incorrect" });
        return;
    }
    
    dataPersons = changePersons;
    res.status(200).json({ message: 'Successful phone number deletion' })
})

app.post('/api/persons', morgan(mwMorganPost), (req, res) => {
    const { name, number } = req.body;
    const persons = [...dataPersons];

    if (!name || !number) {
        res.status(400).json({ error: "Name and phone number are required" })
        return;
    }

    const findName = persons.find(p => p.name === name);

    if(findName) {
        res.status(409).json({error: 'name must be unique'});
        return;
    }

    const newPerson = {
        name,
        number,
        id: generateID()
    }

    const changePersons = [...persons, newPerson];
    dataPersons = changePersons;
    res.json(newPerson);
})

const unknownEndpoint = (req, res, next) => {
    res.status(404).json({error: 'unknown endpoint'})
}

app.use(unknownEndpoint);

app.listen(PORT, () => {
    console.log(`Escuchando servidor desde http://localhost:${PORT}`);
})