
const {client} = require(`./db.${process.env.NODE_ENV}.js`);

var moment = require('moment')

const test = (request, response) => {
  response.status(200).json({msg: 'test success'})
};

const getRoutes = (request, response) => {
  client.query('SELECT * from routes', (error, results) => {
    if (error) {
      response.status(500).json({'server error': error})
    }
    response.status(200).json(results.rows)
  })
  //client.end();
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
  client.query(`SELECT * from stop_times WHERE trip_id LIKE '%` + day + `%' AND stop_id = '236N' AND arrival_time > '` + now + `' ORDER BY arrival_time ASC LIMIT 1 `, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getRoutes,
  getNextTrain,
  test
}