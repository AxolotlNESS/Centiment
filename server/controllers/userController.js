const db = require('../models/userModels');

const userController = {};

userController.getRecipients = (req, res, next) => {
  const recipQuery = 'SELECT name FROM "public"."users"';

  db.query(recipQuery)
    .then((data) => {
      res.locals.recipients = data.rows;
      console.log(res.locals);
      return next();
    })
    .catch((err) =>
      next({
        log: `userController.getRecipients: ERROR: ${err}`,
        message: {
          err: 'Error occured in userController.getRecipients. Check server logs for more details.',
        },
      })
    );
};

module.exports = userController;
