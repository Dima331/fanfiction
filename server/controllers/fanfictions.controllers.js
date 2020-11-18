const FanfictionToChapter = require("../models/FanfictionToChapter");
const FanfictionToTag = require("../models/FanfictionToTag");
const Fanfictions = require("../models/Fanfictions");
const Chapters = require("../models/Chapters");
const Comments = require('../models/Comments');
const Ratings = require('../models/Ratings');
const Genres = require("../models/Genres");
const Users = require('../models/Users');
const Tags = require("../models/Tags");

exports.commentsFanfiction = async (req, res) => {
  const fanfiction = await Comments.findAll({
    where: { fanfictionId: req.params.id },
    include: [Users]
  });

  return res.send(fanfiction);
}

exports.getFanfictions = (req, res) => {
  const finalData = [];

  Fanfictions.findAll({
    include: [Genres, Users]
  })
  .then(async fanfictions => {
    for (let i = 0; i < fanfictions.length; i++) {
      finalData[i] = {};
      const dateNumber = new Date(fanfictions[i].dataValues.updatedAt);

      finalData[i].dateNumber = +dateNumber;
      finalData[i].id = fanfictions[i].dataValues.id;
      finalData[i].rating = fanfictions[i].dataValues.overall_rating;
      finalData[i].title = fanfictions[i].dataValues.title;
      finalData[i].description = fanfictions[i].dataValues.description;
      finalData[i].genre = fanfictions[i].dataValues.genre.name;
      finalData[i].dateString = fanfictions[i].dataValues.updatedAt;
      finalData[i].user = fanfictions[i].dataValues.user.name;

      await FanfictionToTag.findAll({
        where: { fanfictionId: fanfictions[i].dataValues.id },
        include: [Tags]
      })
      .then((tags) => {
        const tagsTmp = [];

        finalData[i].tags = [];

        for (tag of tags) {
          tagsTmp.push(tag.dataValues.tag.dataValues)
        }

        finalData[i].tags = [...tagsTmp]
      })
    }

    finalData.sort((a, b) => a.dateNumber < b.dateNumber ? 1 : -1);

    return res.send(finalData);
  }).catch(err => console.log(err));
}

exports.getFanfiction = (req, res) => {
  const finalData = {};

  Fanfictions.findOne({
    where: { id: req.params.id },
    include: [Genres, Users]
  })
    .then(fanfiction => {
      if (!fanfiction) {
        return res.json({ message: 'not fanfiction' });
      }
      const dateNumber = new Date(fanfiction.dataValues.updatedAt);

      finalData.dateNumber = +dateNumber;
      finalData.title = fanfiction.dataValues.title;
      finalData.description = fanfiction.dataValues.description;
      finalData.genre = fanfiction.dataValues.genre.name;
      finalData.genreId = fanfiction.dataValues.genre.id;
      finalData.dateString = fanfiction.dataValues.updatedAt;
      finalData.user = fanfiction.dataValues.user.name;
      finalData.userId = fanfiction.dataValues.user.id;
      finalData.tags = [];

      FanfictionToTag.findAll({
        where: { fanfictionId: req.params.id },
        include: [Tags]
      })
      .then((tags) => {
        for (tag of tags) {
          finalData.tags.push(tag.dataValues.tag.dataValues);
        }

        return res.send(finalData);
      })
    }).catch(err => console.log(err));
}

exports.deleteFanfictions = async (req, res) => {
  const { id, userId } = req.body;
  console.log(id)
  const fanfiction = await Fanfictions.findOne({ where: { id: id } })

  FanfictionToChapter.findAll({
    where: { fanfictionId: id },
    include: [Chapters]
  })
  .then((chapters) => {
    Fanfictions.destroy({
      where: { id }
    })
    .then(() => {
      for (let val of chapters) {
        Chapters.destroy({
          where: { id: val.dataValues.chaptersId }
        })
        .then(() => {
          FanfictionToChapter.destroy({
            where: { fanfictionId: id },
            include: [Chapters]
          })
        });
      }
    })
  })

  return res.json(fanfiction);
}

exports.addFanfictions = (req, res) => {
  const { tags, genre } = req.body;

  Genres.findOne({ where: { id: genre } })
    .then(genre => {
      const genreId = genre.id;

      Fanfictions.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId,
      }).then(async fanfiction => {
        const fanfictionId = fanfiction.id;

        await Fanfictions.update({ genreId }, {
          where: { id: fanfictionId }
        })

        for (let val of tags) {
          await FanfictionToTag.create({
            fanfictionId: fanfictionId
          }).then(async (data) => {
            const compId = data.id;

            if (val.id) {
              await Tags.findOne({ where: { id: val.id } })
              .then(async tag => {
                const tagId = tag.id;

                await FanfictionToTag.update({ tagId }, {
                  where: { id: compId }
                })
              })
            } else {
              await Tags.create({
                name: val.name
              })
              .then(async data => {
                const tagId = data.id;

                await FanfictionToTag.update({ tagId }, {
                  where: { id: compId }
                })
              }).catch(err => console.log(err));
            }
          })
        }
        return res.json({ id: fanfictionId });
      })
    }).catch(err => console.log(err));
}

exports.editFanfictions = async (req, res) => {
  // const { userId } = req.body;
  const fanfic = await Fanfictions.findOne({ where: { id: req.params.id } })

  // if(fanfic.userId !== userId ){
  //   return res.json({ message: 'not u' });
  // }

  const finalData = {};
  Fanfictions.findOne({ where: { id: req.params.id } })
    .then(fanfiction => {
      finalData.title = fanfiction.dataValues.title;
      finalData.description = fanfiction.dataValues.description;
      finalData.genre = fanfiction.dataValues.genreId;
      finalData.tags = [];
      finalData.allTags = [];

      FanfictionToTag.findAll({
        where: { fanfictionId: req.params.id },
        include: [Tags]
      })
      .then((tags) => {
        for (tag of tags) {
          finalData.tags.push(tag.dataValues.tag.dataValues)
        }

        Tags.findAll({})
        .then((allTagsInBase) => {
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
      FanfictionToTag.destroy({ where: { fanfictionId: +req.body.id } })
      .then(() => {
        Fanfictions.findOne({ where: { id: +req.body.id } })
        .then((fanfiction) => {
          const fanfictionId = fanfiction.id;

          for (let val of req.body.tags) {
            FanfictionToTag.create({
              fanfictionId: fanfictionId
            }).then((data) => {
              const compId = data.id;

              if (val.id) {
                Tags.findOne({ where: { id: val.id } })
                .then(tag => {
                  const tagId = tag.id;

                  FanfictionToTag.update({ tagId: tagId }, {
                    where: { id: compId }
                  })
                })
              } else {
                Tags.create({
                  name: val.name
                })
                .then(data => {
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

exports.userFanfictions = (req, res) => {
  const finalData = [];

  Fanfictions.findAll({
    include: [Genres, Users],
    where: { userId: req.body.id },
  })
  .then(async fanfictions => {
    for (let i = 0; i < fanfictions.length; i++) {
      finalData[i] = {};
      const dateNumber = new Date(fanfictions[i].dataValues.updatedAt);

      finalData[i].dateNumber = +dateNumber;
      finalData[i].id = fanfictions[i].dataValues.id;
      finalData[i].title = fanfictions[i].dataValues.title;
      finalData[i].description = fanfictions[i].dataValues.description;
      finalData[i].genre = fanfictions[i].dataValues.genre.name;
      finalData[i].user = fanfictions[i].dataValues.user.name;
      finalData[i].dateString = fanfictions[i].dataValues.updatedAt;

      await FanfictionToTag.findAll({
        where: { fanfictionId: fanfictions[i].dataValues.id },
        include: [Tags]
      })
      .then((tags) => {
        const tagsTmp = [];
        finalData[i].tags = [];

        for (tag of tags) {
          tagsTmp.push(tag.dataValues.tag.dataValues)
        }
        finalData[i].tags = [...tagsTmp]
      })
    }
    finalData.sort((a, b) => a.dateNumber < b.dateNumber ? 1 : -1);

    return res.send(finalData);
  }).catch(err => console.log(err));
}

exports.ratingFanfiction = async (req, res) => {
  const { mark, idFan } = req.body;
  const userId = req.body.user.id;
  const userInBase = await Ratings.findOne({
    where: { userId: userId, fanfictionId: +idFan }
  })

  if (!userInBase) {
    await Ratings.create({
      userId: userId,
      mark: mark,
      fanfictionId: +idFan
    })
  } else {
    await Ratings.update({ mark }, {
      where: { userId: userId, fanfictionId: +idFan }
    })
  }
  await Ratings.findAll({
    where: { fanfictionId: idFan }
  })
  .then(async (marksFanfiction) => {
    if (marksFanfiction) {
      let overall = 0;

      for (let val of marksFanfiction) {
        overall += val.mark;
      }
      overall /= marksFanfiction.length;
      overall = overall.toFixed(1);

      await Fanfictions.update({ overall_rating: overall }, {
        where: { id: idFan }})

      const fan = await Fanfictions.findOne({ where: { id: +idFan } })

      return res.send(fan);
    }
  })
}
