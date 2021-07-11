const path = require('path');
const express = require('express');
const apiRouter = require('./routes/api');

const app = express();

const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '../src')));

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
