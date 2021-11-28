const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    description: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String,
        required: 'This field is required.'
    },
    ingredients: {
        type: Array,
        required: 'This field is required.'
    },
    category: {
        type: String,
        enum: ['Local', 'Sports', 'Weather', 'Global', 'Gossip'],
        required: 'This field is required.'
      },
    image: {
    type: String,
    required: 'This field is required.'
    },
});

mediaSchema.index({ name: 'text', description: 'text' });


module.exports = mongoose.model('Media', mediaSchema);

