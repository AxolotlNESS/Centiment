const { Pool } = require('pg');

// link to database
const PG_URI =
  'postgres://gdutajnk:ib5Sa9FHSXnkfiUllxNh_EwNQN67jbO-@batyr.db.elephantsql.com/gdutajnk';

// database connection
const pool = new Pool({
  connectionString: PG_URI,
});

// export standard query format
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
