if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./queries');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({db: db})
})

app.get('/routes', db.getRoutes);
app.get('/nextTrain', db.getNextTrain);

app.listen(port, () => {
  console.log(`App running on ${port}`)
})