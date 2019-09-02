const Pool = require('pg').Pool

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
})

module.exports = {client}