const config = require('./utils/config.js');
const express = require('express');
const app = express();
const cors = require('cors')
const blogRoutes = require('./controllers/blog.controller.js');
const userRoutes = require('./controllers/user.controller.js')
const loginRoutes = require('./controllers/login.controller.js')
const mongoose = require('mongoose');
const URL_API = '/api/blogs';
const URL_USERS = '/api/users'
const URL_LOGIN = '/api/login'
const logger = require('./utils/logger.js');
const middlewares = require('./utils/middlewares.js')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('✌️ Conectado a MongoDB desde Mongoose')
    })
    .catch(err => {
        logger.error('❌ Conexión a la base de datos fallida')
    })

app.use(cors())
app.use(express.json());
app.use(middlewares.addTokenToTheRequest)

app.get('/', (req, res) => {
    res.send('Aún no hay frontend')
})

app.use(URL_API, blogRoutes)
app.use(URL_USERS, userRoutes)
app.use(URL_LOGIN, loginRoutes)

app.use(middlewares.errorHandler)

module.exports = app