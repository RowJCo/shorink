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
            //Creates a random 8 character key
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let key = '';
            for (let i = 0; i < 8; i++) {
                key += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return key;
        }
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
});

const link = mongoose.model('link', linkSchema);

module.exports = link;