const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
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
        enum: ["Illustration - Concept", "3D Modeling", "Animation"]
    },
    nameInCloud: {
        type: String,
        required: true
    },
    detail: {
        type: String
    },
    order: {
        type: Number,
        required: true
    }
})

module.exports = new mongoose.model('Artwork', artworkSchema)