const { Pool } = require('pg');

const PG_URI =
  'postgres://gdutajnk:ib5Sa9FHSXnkfiUllxNh_EwNQN67jbO-@batyr.db.elephantsql.com/gdutajnk';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
