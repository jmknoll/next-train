import axios from "axios";
import { resolve } from "url";

const { REACT_APP_MTA_BASE_URL, REACT_APP_MTA_API_KEY } = process.env;

class DataService {
  constructor() {}

  getData({ time, station, direction }) {
    return axios
      .get(
        `http://localhost:3000/nextTrain?time=${time}&station=236&direction=N`
      )

      .then(response => {
        return response.data;
      })
      .catch(function(error) {
        // handle error
        console.log("err", error);
      })
      .finally(function(res) {
        console.log("finally", res);
        // always executed
      });
  }

  getRoutes() {
    return axios
      .get(`http://localhost:3000/routes`)
      .then(response => {
        return response.data;
      })
      .catch(function(error) {
        // handle error
        console.log("err", error);
      })
      .finally(function(res) {
        console.log("finally", res);
        // always executed
      });
  }

  getStops() {
    return axios
      .get(`http://localhost:3000/stops`)
      .then(response => {
        return response.data;
      })
      .catch(function(error) {
        // handle error
        console.log("err", error);
      })
      .finally(function(res) {
        console.log("finally", res);
        // always executed
      });
  }
}

export default DataService;
