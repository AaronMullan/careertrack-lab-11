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
  let itineraries;
  
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
  it('gets a list of trips', async() => {
    const trips = await Trip.create([
      { name: 'paris' },
      { name: 'tokyo' }
    ]);
    return request(app)
    
      .get('/api/v1/trips')
      .then(res => {
        trips.forEach(trip => {
          expect(res.body).toContainEqual({
            _id: trip._id.toString(),
            name: trip.name,
            __v:0
          });
        });
      });
  });
  it('gets a trip by id', async() => {
    return request(app)
      .get(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: trip.name,
          __v:0

        });
      });
  });
});

