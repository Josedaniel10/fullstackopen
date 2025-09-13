const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(uri)
    .then(() => console.log('✌️ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error al conectar:', err))

const personsShema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: (number) => {
                const arr = number.split('-');
                if (number.length < 8 || arr.length > 2) return false;
                if (arr[0].length === 2 || arr[0].length === 3) {
                    return true;
                }
                return false;
            },
            message: props => `The phone number "${props.value}" has an invalid format`
        }
    },
})

personsShema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Persons', personsShema);