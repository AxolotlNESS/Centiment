const db = require('../models/userModels');

const userController = {};

userController.newUser = (req, res, next) => {
  console.log("running new user")
  const { _id, name, username, password } = req.body;
  const newUserQuery = `INSERT INTO users (_id, name, points, username, password)
  VALUES ($1, $2, $3, $4, $5)`;
  const params = [_id, name, 100, username, password];
  db.query(newUserQuery, params)
    .then((result) => {
      res.locals.userTable = result.rows[0];
      return next();
    })
    .catch((err) =>
      next(
        JSON.stringify({
          log: `userController.newUser: ERROR: ${err}`,
          message: {
            err: 'Error occured in userController.newUser. Check server logs for more details',
          },
        })
      )
    );
};

userController.checkUser = (req, res, next) => {
  console.log("running check user")
  // console.log('Do we enter getRecipients function?');
  const userQuery =
    'SELECT username, password FROM users WHERE username = $1 AND password = $2';
  const { username, password } = req.body;
  const params = [username, password];
  // console.log('stering of recipQuery: ' + recipQuery);
  db.query(userQuery, params)
    .then((data) => {
      // console.log('we did it! cool');
      res.locals.users = data.rows;
      // console.log('list of names: ' + res.locals.recipients);
      return next();
    })
    .catch((err) => {
      return next({
        log: `userController.checkUser: ERROR: ${err}`,
        message: {
          err: 'Error occured in userController.checkUser. Check server logs for more details.',
        },
      });
    });
};

userController.getRecipients = (req, res, next) => {
  console.log("running get recipients")
  // console.log('Do we enter getRecipients function?');
  const recipQuery = 'SELECT _id, name FROM users';
  // console.log('string of recipQuery: ' + recipQuery);
  db.query(recipQuery)
    .then((data) => {
      // console.log('we did it! cool');
      res.locals.recipients = data.rows;
      // console.log('list of names: ' + res.locals.recipients);
      return next();
    })
    .catch((err) => {
      return next({
        log: `userController.getRecipients: ERROR: ${err}`,
        message: {
          err: 'Error occured in userController.getRecipients. Check server logs for more details.',
        },
      });
    });
};
userController.getFeed = (req, res, next) => {
  console.log("running get feed")
  // console.log('Do we enter getRecipients function?');
  const feedQuery =
    'SELECT shoutouts.*, public.users.name AS recipient FROM shoutouts LEFT JOIN users ON shoutouts.recipient_id = users._id';
  db.query(feedQuery)
    .then((data) => {
      // console.log('we did it! cool');
      res.locals.feed = data.rows;
      // console.log('list of names: ' + res.locals.feed);
      return next();
    })
    .catch((err) => {
      return next({
        log: `userController.getFeed: ERROR: ${err}`,
        message: {
          err: 'Error occured in userController.getFeed. Check server logs for more details.',
        },
      });
    });
};

userController.postFeed = (req, res, next) => {
  console.log("running post feed")
  const { sender, recipient_id, points, messages, sender_id } = req.body;
  const queryPostToFeed = `INSERT INTO shoutouts (sender, recipient_id, points, messages, sender_id) 
    VALUES ($1, $2, $3, $4, $5)`;
  const params = [sender, recipient_id, points, messages, sender_id];
  db.query(queryPostToFeed, params)
    .then((result) => {
      res.locals.shoutoutFeed = result.rows[0];
      return next();
    })
    .catch((err) =>
      next(
        JSON.stringify({
          log: `userController.postFeed: ERROR: ${err}`,
          message: {
            err: 'Error occured in userController.postFeed. Check server logs for more details',
          },
        })
      )
    );
};

userController.addPoints = (req, res, next) => {
  console.log("running add points")
  const { recipient_id, points } = req.body;
  const addPointsQuery = 'UPDATE users SET points = points + $1 WHERE _id = $2';
  const params = [points, recipient_id];
  db.query(addPointsQuery, params)
    .then((result) => {
      res.locals.pointsRecieved = result.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `userController.addPoints: ERROR: ${err}`,
        message: {
          err: 'Error occured in userController.addPoints Check server logs for more details',
        },
      });
    });
};

userController.subtractPoints = (req, res, next) => {
  console.log("running sub points")
  const { sender_id, points } = req.body;
  const subtractPointsQuery =
    'UPDATE users SET points = points - $1 WHERE _id = $2';
  const params = [points, sender_id];
  db.query(subtractPointsQuery, params)
    .then((result) => {
      res.locals.pointsSent = result.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: `userController.subtractPoints: ERROR: ${err}`,
        message: {
          err: 'Error occured in userController.subtractPoints. Check server logs for more details',
        },
      });
    });
};

// console.log(JSON.stringify(userController));
// console.log(userController.getRecipients);
module.exports = userController;
