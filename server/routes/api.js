const express = require('express');

const userController = require('../controllers/userController.js');

const router = express.Router();

// get request to get recipeients 
router.get('/', userController.getRecipients, (req, res) =>
  res.status(200).json([...res.locals.recipients])
);

// get request to get feed
router.get('/feed', userController.getFeed, (req, res) =>
  res.status(200).json([...res.locals.users])
);

router.patch('/users', userController.addPoints, userController.subtractPoints, (req, res) =>
res.status(200).json([...res.locals.users])
);

// get request to post to feed
router.post('/feed', userController.postFeed, (req, res) =>
  res.status(200).json(res.locals.shoutoutFeed)
);

// get request to perform transaction, add points to target user
// subtract from current user
router.patch(
  '/users',
  userController.addPoints,
  userController.subtractPoints,
  (req, res) => res.status(200).send('Something happened. Yay!')
);

// create new user when they signup on the main page
// NOTE I believe this route has been tested in postman but does not
// yet work with the frontend
router.post('/create', userController.newUser, (req, res) =>
  res.status(200).json(res.locals.userTable)
);

// checks user on login attempt
// same story as above, tested on postman, not yet functional with frontend
router.get('/login', userController.checkUser, (req, res) =>
  res.status(200).json(res.locals.users)
);

module.exports = router;
