const mongoose = require('mongoose');

const showcaseSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    nameInCloud: {
        type: String
    },
    order: {
        type: Number
    }
})

module.exports = new mongoose.model('Showcase', showcaseSchema)