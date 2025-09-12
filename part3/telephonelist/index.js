require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const Persons = require('./models/persons.js');

const app = express();
const PORT = process.env.PORT || 3000;

morgan.token('body', (req) => {
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

app.get('/api/persons/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const person = await Persons.findById(id);
        if (!person) {
            res.status(404).json({ error: 'The phone number was not found' });
            return;
        }
        res.json(person);
    } catch (err) {
        next(err);
    }
})

app.delete('/api/persons/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const person = await Persons.findByIdAndDelete(id);
        res.status(200).json({ message: 'Successful phone number deletion' })
    } catch (err) {
        next(err);
    }
})

app.post('/api/persons', morgan(mwMorganPost), async (req, res, next) => {
    const { name, number } = req.body;

    try {
        const person = new Persons({
            name,
            number
        })
        let savedPerson = await person.save();
        res.json(savedPerson);
    } catch (err) {
        next(err);
    }
})

app.put('/api/persons/:id', async (req, res, next) => {
    const id = req.params.id;
    const { name, number } = req.body;

    const person = {
        name,
        number
    }

    try {
        const opts = {
            new: true,
            runValidators: true,
            context: 'query'
        }
        const updatedPerson = await Persons.findByIdAndUpdate(id, person, opts);
        res.json(updatedPerson);
    } catch (err) {
        next(err);
    }
})

const unknownEndpoint = (req, res, next) => {
    res.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
    console.error(err.message);

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if(err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    }
    next(err);
}

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Escuchando servidor desde http://localhost:${PORT}`);
})