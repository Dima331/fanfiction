const Fanfictions = require("../models/Fanfictions");
const Tags = require("../models/Tags");
const FanfictionToTag = require("../models/FanfictionToTag");
const Genres = require("../models/Genres");



exports.getFanfictions = (req, res) => {
  Fanfictions.findAll({ raw: true }).then(fanfictions => {
    return res.json(fanfictions);
  }).catch(err => console.log(err));
}

exports.deleteFanfictions = (req, res) => {
  Fanfictions.destroy({
    where: { id: req.body.id }
  }).then(res => {
    return res.json({ message: 'deleted' });
  });
}

exports.addFanfictions = async (req, res) => {
  const { tags, genre } = req.body

  Genres.findOne({ where: { id: genre } })
    .then(genre => {
      const genreId = genre.id

      Fanfictions.create({
        title: req.body.title,
        description: req.body.description,
      }).then(fanfiction => {
        const fanfictionId = fanfiction.id;

        Fanfictions.update({ genreId: genreId }, {
          where: { id: fanfictionId }
        })

        for (let val of tags) {
          FanfictionToTag.create({
            fanfictionId: fanfictionId
          }).then((data) => {
            const compId = data.id;

            if (val.id) {
              Tags.findOne({ where: { id: val.id } }).then(tag => {
                const tagId = tag.id;

                FanfictionToTag.update({ tagId: tagId }, {
                  where: { id: compId }
                })
              })
            } else {
              Tags.create({
                name: val.name
              }).then(data => {
                const tagId = data.id;

                FanfictionToTag.update({ tagId: tagId }, {
                  where: { id: compId }
                })
              }).catch(err => console.log(err));
            }
          })
        }
        return res.json({ message: 'added' });
      })
    }).catch(err => console.log(err));
}

exports.editFanfictions = (req, res) => {
  const finalData = {}

  Fanfictions.findOne({ where: { id: req.params.id } })
    .then(fanfiction => {
      finalData.title = fanfiction.dataValues.title,
      finalData.description = fanfiction.dataValues.description,
      finalData.genre = fanfiction.dataValues.genreId,
      finalData.tags = []
      finalData.allTags = []

      FanfictionToTag.findAll({
        where: { fanfictionId: req.params.id },
        include: [Tags]
      }).then((tags) => {
        for (tag of tags) {
          finalData.tags.push(tag.dataValues.tag.dataValues)
        }
        Tags.findAll({}).then((allTagsInBase) => {
          let entry = false
          
          for (tagInBase of allTagsInBase) {
            for (tagInFan of finalData.tags) {
              if (tagInBase.name === tagInFan.name) {
                entry = true
              }
            }
            if (!entry) {
              finalData.allTags.push(tagInBase)
            }
            entry = false
          }

          return res.send(finalData);
        })
      })
    }).catch(err => console.log(err));
}

exports.changeFanfictions = (req, res) => {

  Fanfictions.update(
    {
      title: req.body.title,
      description: req.body.description,
      genreId: +req.body.genre,
    },
    { where: { id: +req.body.id } })
    .then(() => {
      FanfictionToTag.destroy({ where: { fanfictionId: +req.body.id } }).then(() => {
        Fanfictions.findOne({ where: { id: +req.body.id } }).then((fanfiction) => {
          const fanfictionId = fanfiction.id;

          for (let val of req.body.tags) {
            FanfictionToTag.create({
              fanfictionId: fanfictionId
            }).then((data) => {

              const compId = data.id;
              if (val.id) {
                Tags.findOne({ where: { id: val.id } }).then(tag => {
                  const tagId = tag.id;
                  FanfictionToTag.update({ tagId: tagId }, {
                    where: { id: compId }
                  })
                })
              } else {
                Tags.create({
                  name: val.name
                }).then(data => {
                  const tagId = data.id;

                  FanfictionToTag.update({ tagId: tagId }, {
                    where: { id: compId }
                  })
                }).catch(err => console.log(err));
              }
            })
          }
        })




      }).catch(err => console.log(err));


      return res.json({ message: 'added' });
    }).catch(err => console.log(err));

}

exports.getFanfiction = (req, res) => {
  const finalData = {}

  console.log(req.params.id)
  Fanfictions.findOne({
    where: { id: req.params.id },
    include: [Genres]
  },
  )
    .then(fanfiction => {
      finalData.title = fanfiction.dataValues.title,
        finalData.description = fanfiction.dataValues.description,
        finalData.genre = fanfiction.dataValues.genre.name,
        finalData.tags = []

      FanfictionToTag.findAll({
        where: { fanfictionId: req.params.id },
        include: [Tags]
      }).then((tags) => {
        for (tag of tags) {
          finalData.tags.push(tag.dataValues.tag.dataValues)
        }

        return res.send(finalData);
      })
    }).catch(err => console.log(err));
}
