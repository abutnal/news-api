require('./globals/functions')
require('dotenv/config')
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const session = require('express-session');
const logger = require('./utils/logger');
// app.use(express.json());
app.use(bodyParser.json());
app.use(cors())

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 100000 }))
app.use(bodyParser.json({ limit: '50mb', parameterLimit: 100000 }))

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    resave: false,
    saveUninitialized: true
}));
require("./middleware/routes.js")(app);
const PORT = process.env.PORT || '8000';
app.listen(PORT, () => {
    logger.info(`Server is running on PORT: ${PORT}`)
    console.log(`Server is running on PORT: ${PORT}`)
})
