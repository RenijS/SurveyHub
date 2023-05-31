const { Pool } = require('pg')
 

const dabtabaseURL = process.env.DB_URL;

const pool = new Pool({
    connectionString: dabtabaseURL,
    ssl: {
        rejectUnauthorized: false
    }
})
  

module.exports = pool;