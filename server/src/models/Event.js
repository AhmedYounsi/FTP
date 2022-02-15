const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },

  adress: {
    type: String,
    required: true,
  },

  type: {
    type: String,
  },
  desc: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  start_time: [],
  end_time: [],
  etat: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Event = mongoose.model('event', EventSchema);
