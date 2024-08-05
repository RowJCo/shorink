const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    key: {
        type: String,
        unique: true,
        default: generateRandomKey = () => {
            //Creates a random 5 character key
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let key = '';
            for (let i = 0; i < 5; i++) {
                key += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return key;
        }
    },
    clicks: {
        type: Number,
        default: 0
    }
});

const link = mongoose.model('link', linkSchema);

module.exports = link;