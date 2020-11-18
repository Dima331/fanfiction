const Tags = require("../models/Tags");

exports.getTags = (req, res) => {
    Tags.findAll({ raw: true }).then(tags => {
        return res.json(tags);
    }).catch(err => console.log(err));
}
