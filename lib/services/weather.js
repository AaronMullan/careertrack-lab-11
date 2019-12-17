const superagent = require('superagent');

const getWeather = () => {
  return superagent
    .get('https://www.metaweather.com/api/location/2475687')
    .then(res => {
      const [{ weather }] = res.body;

      return weather;
    });
};

module.exports = {
  getWeather
};
