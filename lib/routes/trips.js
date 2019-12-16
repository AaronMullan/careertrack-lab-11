const { Router } = require('express');
const Trip = require('../models/Trip');

module.exports = Router()
  .post('/', (req, res) => {
    Trip
      .create(req.body)
      .then(trip => res.send(trip));
  })
//   .get('/', (req, res) => {
//     let tripQuery = {};
//     Trip
//       .find;
//   })
;
