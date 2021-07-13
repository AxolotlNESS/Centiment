const path = require('path');
const express = require('express');
const apiRouter = require('./routes/api');
// const userController = require('./userController.js');

// initialize our app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '../src')));

<<<<<<< HEAD
// app.get('/', userController.getRecipients, (req, res) =>
//   //go back and console log res.locals.recipients
//   res.status(200).json([...res.locals.recipients])
// );


=======
// our current only route, all roads lead through here, in hindsight 
// we probably should've split this up more
>>>>>>> 35676cea499f3d3822c5fcde814cc7dc644f9c5b
app.use('/api', apiRouter);

// start server listen
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
