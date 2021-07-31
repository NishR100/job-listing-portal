// include the application dependencies
require('./db-connection')();

const express = require('express');
const jobs = require('./route');
const app = express();
const cors = require('cors');

// add middlewares
app.use(cors());
app.use(express.json());

// setting up basic GET route to show that the API is working
app.get('/', (req, res) => {
    res.send('API is working...');
});
// setting up jobs routes
app.use(`/jobs`, jobs);

// setting port and starting ExpressJS API
const port = process.env.PORT || 4000;
app.listen(port, console.log(`API running @ ${port}`));
