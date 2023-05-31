const { Pool } = require('pg')
 
const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DB;
const port = process.env.DB_PORT;

const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port
})
  

module.exports = pool;