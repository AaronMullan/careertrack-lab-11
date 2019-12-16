const mongoose = require('mongoose');
const Itinerary = require('./Itinerary');

describe('Itinerary model', () => {
  it('has a required tripId', () => {
    const itinerary = new Itinerary({
      name: 'haha'
    });
    const { errors } = itinerary.validateSync();

    expect(errors.tripId.message).toEqual('Path `tripId` is required.');
  });
  it('has a required name', () => {
    const itinerary = new Itinerary({
      rating: -1
    });
    const { errors } = itinerary.validateSync();
       
    expect(errors.name.message).toEqual('Path `name` is required.');
   
  });
});
