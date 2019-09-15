const { client } = require(`./db.${process.env.NODE_ENV}.js`);

var moment = require("moment");

const test = (request, response) => {
  response.status(200).json({ msg: "test success" });
};

const getRoutes = (request, response) => {
  client.query("SELECT * from routes", (error, results) => {
    if (error) {
      response.status(500).json({ "server error": error });
    }
    response.status(200).json(results.rows);
  });
};

const getNextTrain = (request, response) => {
  const { time, station, direction } = request.query;
  const transformDay = day => {
    if (day === 6) {
      return "Saturday";
    }
    if (day === 7 || day === 0) {
      return "Sunday";
    }
    return "Weekday";
  };
  let day = transformDay(moment(time, "x").day());
  let now = moment(time, "x").format("HH:mm:ss");
  client.query(
    `SELECT * from stop_times WHERE trip_id LIKE '%` +
      day +
      `%' AND stop_id = '` +
      station +
      direction +
      `' AND arrival_time > '` +
      now +
      `' ORDER BY arrival_time ASC`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getRoutes,
  getNextTrain
};
