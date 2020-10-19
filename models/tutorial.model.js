const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
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
        enum: ["Digital Art", "3D Modeling"]
    },
    big: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    nameInCloud: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('Tutorial', tutorialSchema)