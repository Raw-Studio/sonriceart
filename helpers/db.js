const mongoose = require('mongoose');
//const Admin = require('../models/admin.model');

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    }
    catch (err) {
        console.log(err)
    }
}