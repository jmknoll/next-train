const protobuf = require("protobufjs");
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const request = require('request');

const REACT_APP_MTA_BASE_URL = 'http://datamine.mta.info/mta_esi.php'
const REACT_APP_MTA_API_KEY = 'b864b1f559d7087cda8638eb1bb69413'

exports.handler = async (event, context) => {
  const requestUrl = `${REACT_APP_MTA_BASE_URL}?key=${REACT_APP_MTA_API_KEY}&feed_id=21`;

  var requestSettings = {
    method: 'GET',
    url: requestUrl,
    encoding: null
  };
  
 request(requestSettings, function (error, response, body) {

    if (!error && response.statusCode == 200) {
      var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      feed.entity.forEach( (entity) => {
        //console.log(entity)
        if (entity.tripUpdate) {
          console.log(entity.tripUpdate)
        }
      });
    }
  });


  return {
    statusCode: 200,
    body: 'success'
  };
};
