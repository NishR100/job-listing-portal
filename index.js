// include the application dependencies
require('./db-connection')();
const express = require('express');
const jobs = require('./route');
const app = express();
const cors = require('cors');
const path = require('path');

// add middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// setting up basic GET route to show that the API is working
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// setting up jobs routes
app.use(`/jobs`, jobs);

// setting port and starting ExpressJS API
const port = process.env.PORT || 4000;
app.listen(port, console.log(`API running @ ${port}`));
