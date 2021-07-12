const db = require('../models/userModels');

const userController = {};

userController.getRecipients = (req, res, next) => {
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
  console.log('Do we enter getRecipients function?');
  const feedQuery =
    'SELECT shoutouts.*, public.users.name AS recipient FROM shoutouts LEFT JOIN users ON shoutouts.recipient_id = users._id';
  db.query(feedQuery)
    .then((data) => {
      console.log('we did it! cool');
      res.locals.feed = data.rows;
      console.log('list of names: ' + res.locals.feed);
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
        log: `userController.postFeed: ERROR: ${err}`,
        message: {
          err: 'Error occured in userController.postFeed. Check server logs for more details',
        },
      });
    });
};

userController.subtractPoints = (req, res, next) => {
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
        log: `userController.postFeed: ERROR: ${err}`,
        message: {
          err: 'Error occured in userController.postFeed. Check server logs for more details',
        },
      });
    });
};

// console.log(JSON.stringify(userController));
// console.log(userController.getRecipients);
module.exports = userController;
