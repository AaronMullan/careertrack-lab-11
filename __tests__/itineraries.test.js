require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');
const Itinerary = require('../lib/models/Itinerary');

describe('event routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let trip;
  let itinerary;
  beforeEach(async() => {
    trip = await Trip.create({
      name: 'new york',
    });

    itinerary = await Itinerary.create({
      tripId: trip._id,
      name: 'Theatre of Payne',
      location: 'Brooklyn',
      
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an event', () => {
    return request(app)
      .post('/api/v1/itineraries')
      .send({
        tripId: trip._id,
        name: 'Theatre of Payne',
        location: 'Brooklyn',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: trip._id.toString(),
          name: 'Theatre of Payne',
          location: 'Brooklyn',
          __v: 0
        });
      });
  });

  it('gets all itineraries', async() => {
    const itineraries = await Itinerary.create([
      { tripId: trip._id, name: 'Warriors', location: 'coney island' },
      { tripId: trip._id, name: 'Warriors 2', location: 'bronx zoo' },
      { tripId: trip._id, name: 'Warriors 3', location: 'subway' },
      { tripId: trip._id, name: 'Warriors 4', location: 'downtown' },
    ]);

    return request(app)
      .get('/api/v1/itineraries')
      .then(res => {
        itineraries.forEach(itinerary => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(itinerary)));
        });
      });
  });

  it('gets an itinerary by id', async() => {
    return request(app)
      .get(`/api/v1/itineraries/${itinerary._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          location: 'Brooklyn',
          name: 'Theatre of Payne',
          tripId: trip._id.toString(),
          __v: 0
        });
      });
  });

  it('updates an itinerary by id', async() => {
    return request(app)
      .patch(`/api/v1/itineraries/${itinerary._id}`)
      .send({ location: 'Central Park'})
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          location: 'Central Park',
          name: 'Theatre of Payne',
          tripId: trip._id.toString(),
          __v: 0
        });
      });
  });

  it('deletes an itinerary by id', async() => {
    return request(app)
      .delete(`/api/v1/itineraries/${itinerary._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: trip._id.toString(),
          name: 'Theatre of Payne',
          location: 'Brooklyn',
          __v: 0
        });
      });
  });
});
