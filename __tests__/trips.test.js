require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');
const Itinerary = require('../lib/models/Itinerary.test');

describe('trip routes', () => {
  beforeAll(() => {
    connect();
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  let trip;
  beforeEach(async() => {
    trip = await Trip.create({
      name: 'hawaii'
    });

  });
  afterAll(() => {
    return mongoose.connection.close();
  });
  it('creates a trip', () => {
    return request(app)
      .post('/api/v1/trips')
      .send({
        name: 'new york'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'new york',
          __v:0
        });
      });
  });
});

