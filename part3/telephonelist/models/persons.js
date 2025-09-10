const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(uri)
    .then(res => console.log('✌️ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error al conectar:', err))

const personsShema = new mongoose.Schema({
    name: String,
    number: String,
})

personsShema.set('toJSON', {
    transform: (document, returnedObject)=> {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Persons', personsShema);