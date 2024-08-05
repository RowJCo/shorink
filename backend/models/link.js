const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    longLink: {
        type: String,
        required: true
    },
    shortLink: {
        type: String,
        required: true
    },
});

const link = mongoose.model('link', linkSchema);

module.exports = link;