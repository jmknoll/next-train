const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

var moment = require('moment')

const getRoutes = (request, response) => {
  pool.query('SELECT * from routes', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getNextTrain = (request, response) => {
  const station = '236' // 236N || 236S;
  const transformDay = (day) => {
    console.log(day)
    if (day === 6) {
      return 'Saturday'
    }
    if (day === 7 || day === 0) {
      return "Sunday"
    }
    return 'Weekday'
  }
  let day = transformDay(moment().day());
  let now = moment().format('HH:mm:ss');
  pool.query(`SELECT * from stop_times WHERE trip_id LIKE '%` + day + `%' AND stop_id = '236N' AND arrival_time > '` + now + `' ORDER BY arrival_time ASC LIMIT 1 `, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getRoutes,
  getNextTrain,
}