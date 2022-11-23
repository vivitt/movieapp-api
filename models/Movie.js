const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    category: {
        type: String
    },
    poster: {
        type: String
    },
    title: {
        type: String,
        unique: true
    },
    plot: {
        type: String
    },
    year: {
        type: Number
    },
    rating: {
        type: Number
    }, 
})


module.exports = new mongoose.model("Movie", movieSchema)
