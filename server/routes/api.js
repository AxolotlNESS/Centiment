const express = require('express');

const userController = require('../controllers/userController.js');

const router = express.Router();

//userController.getRecipients,
// console.log(userController.getRecipients());
router.get('/', userController.getRecipients, (req, res) =>
  //go back and console log res.locals.recipients
  res.status(200).json([...res.locals.recipients])
);

// console.log(userController.getFeed());
router.get('/feed', userController.getFeed, (req, res) =>
  res.status(200).json([...res.locals.feed])
);

router.post('/feed', userController.postFeed, (req, res) =>
  res.status(200).json(res.locals.shoutoutFeed)
);

router.patch(
  '/users',
  userController.addPoints,
  userController.subtractPoints,
  (req, res) => res.status(200).send('Something happened. Yay!')
);

module.exports = router;
