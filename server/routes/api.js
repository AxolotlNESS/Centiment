const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

//userController.getRecipients,
// console.log(JSON.stringify(userController.getRecipients));
router.get('/', userController.getRecipients, (req, res) =>
  //go back and console log res.locals.recipients
  res.status(200).json([...res.locals.recipients])
);
module.exports = router;
