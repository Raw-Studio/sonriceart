const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    album: {
        type: String,
        enum: ["Illustrations", "3D Models", "3D Materials"]
    },
    link: {
        type: String,
        required: true
    },
    nameInCloud : {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('Store', storeSchema)