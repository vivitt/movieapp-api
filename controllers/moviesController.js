const movieModel = require('../models/Movie');

const getAllTheMovies = async (req, res) => {
    try {
        const allTheMovies = await movieModel.find();
        return res.status(200).json({
            success: true,
            movies: allTheMovies
        })
    } catch (err) {
        console.log(err)
    }
};

module.exports = {getAllTheMovies}


