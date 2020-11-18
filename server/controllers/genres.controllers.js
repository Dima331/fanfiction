const Genres = require("../models/Genres");

exports.getGenres = (req, res) => {
    Genres.findAll({ raw: true }).then(genres => {
        return res.json(genres);
    }).catch(err => console.log(err));
}