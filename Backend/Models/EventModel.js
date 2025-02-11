const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Conference', 'Workshop', 'Seminar', 'Meetup', 'Music', 'Lecture', 'Symposium']
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;