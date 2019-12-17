const superagent = require('superagent');

const getWeather = () => {
  return superagent
    .get('https://www.metaweather.com/api/location/2475687')
    .then(res => {
      const [{ consolidated_weather }] = res.body;

      return weather;
    });
};

module.exports = {
  getWeather
};
getWeather();
.then(weather => {
    req.weather = weather;
    next();
});
console.log(weather);