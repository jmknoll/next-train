import axios from 'axios';

const { REACT_APP_MTA_BASE_URL, REACT_APP_MTA_API_KEY } = process.env;



class DataService {

  constructor() {
  
  }

  getData(val) {
    const requestUrl = `${REACT_APP_MTA_BASE_URL}?key=${REACT_APP_MTA_API_KEY}&feed_id=${val}`
    axios({
      method: 'POST',
      url: 'http://localhost:8888/.netlify/functions/provideTransitData',
      data: {
        requestUrl
      },
      responseType: 'arraybuffer',
    })
    .then(function (response) {
      // handle success
      console.log('res', response);
    })
    .catch(function (error) {
      // handle error
      console.log('err', error);
    })
    .finally(function (res) {
      console.log('finally', res)
      // always executed
    });
  }
}

export default DataService;