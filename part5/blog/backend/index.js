const app = require('./app.js');
const config = require('./utils/config.js');
const logger = require('./utils/logger.js');

app.listen(config.PORT, ()=> {
    logger.info(`Listen server from http://localhost:${config.PORT}`)
})