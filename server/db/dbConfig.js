const { Pool } = require('pg')
 

const dabtabaseURL = process.env.EXTERNAL_URL || process.env.INTERNAL_URL;

const pool = new Pool({
    connectionString: dabtabaseURL,
})
  

module.exports = pool;