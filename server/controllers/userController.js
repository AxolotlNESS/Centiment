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

userController.addPoints = (req, res, next) => {
  const addPointsQuery = 'UPDATE users SET points = points + $1 WHERE _id = 1'
  db.query(addPointsQuery)
  .then((data) => {
    
  })
}

userController.subtractPoints = (req, res, next) => {
  const addPointsQuery = 'UPDATE users SET points = points + $1 WHERE _id = 1'
  db.query(addPointsQuery)
  .then((data) => {

  })
}
// console.log(JSON.stringify(userController));
// console.log(userController.getRecipients);
module.exports = userController;
