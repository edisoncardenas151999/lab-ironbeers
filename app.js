const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials")
// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers() // .getBeers() is the method provided by punkAPI
    .then((responseFromDB) => {
      // console.log("Response is:",  responseFromDB);
      // beers is the hbs file that's gonna be rendered, it comes from "views" folder
      //  ^
      //  |-------------- |          "beers" is the name of a variable we will use in hbs file
      //                  |             |
      res.render('beers/beers.hbs', { beers: responseFromDB });
    })
    .catch((error) => console.log(error));
});
app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
  })
  .catch(error => console.log(error));
  res.render('random-beer');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
