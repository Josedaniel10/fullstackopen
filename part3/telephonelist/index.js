require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const Persons = require('./models/persons.js');

const app = express();
const PORT = process.env.PORT || 3000;

morgan.token('body', (req)=> {
    return JSON.stringify(req.body);
})

const mwMorganPost = ':method :url :status :res[content-length] - :response-time ms :body';
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

app.use(express.static('dist'));

app.get('/api/persons', async (req, res) => {
    const persons = await Persons.find({});
    res.json(persons);
})

app.get('/info', async (req, res) => {
    const persons = await Persons.find({});
    const formatDate = `${new Date().toDateString()} ${new Date().toTimeString()}`
    const info = `<p>Phonebook has info for ${persons.length} people</p><p>${formatDate}</p>`;

    res.send(info);
})

app.get('/api/persons/:id', async (req, res) => {
    const { id } = req.params;
    const person = await Persons.findById(id);

    if (!person) {
        res.status(404).json({ error: 'The phone number was not found' });
        return;
    }

    res.json(person);
})

app.delete('/api/persons/:id', async (req, res) => {
    const { id } = req.params;
    const person = await Persons.findByIdAndDelete(id);
    console.log(person);
    
    /* if (changePersons.length === persons.length) {
        res.status(400).json({ error: "The request is incorrect" });
        return;
    } */

    res.status(200).json({ message: 'Successful phone number deletion' })
})

app.post('/api/persons', morgan(mwMorganPost), async (req, res) => {
    const { name, number } = req.body;

    if (!name || !number) {
        res.status(400).json({ error: "Name and phone number are required" })
        return;
    }

    /*
    if(foundName) {
        res.status(409).json({error: 'name must be unique'});
        return;
    } */

    const person = new Persons({
        name,
        number
    })

    let savedPerson = await person.save();
    res.json(savedPerson);
})

const unknownEndpoint = (req, res, next) => {
    res.status(404).json({error: 'unknown endpoint'})
}

app.use(unknownEndpoint);

app.listen(PORT, () => {
    console.log(`Escuchando servidor desde http://localhost:${PORT}`);
})