const FanfictionToChapter = require("../models/FanfictionToChapter");
const Fanfictions = require("../models/Fanfictions");
const Chapters = require("../models/Chapters");
const Likes = require("../models/Likes");

exports.addChapters = (req, res) => {
    Fanfictions.findOne({
        where: { id: req.body.funId },
    })
    .then((fun) => {
        const fanfiction = fun.title;

        Fanfictions.update({ title: fanfiction },
            { where: { id: req.body.funId } })
    })
    FanfictionToChapter.findAll({
        where: { fanfictionId: req.body.funId },
    })
    .then((fanfictions) => {
        let order = 1;
        if(fanfictions.length !== 0 ){
            order = fanfictions.length + 1;
        }
        Chapters.create({
            title: req.body.title,
            text: req.body.text,
            image: req.body.image,
            order: +order,
        })
        .then(chapter => {
            const chapterId = chapter.id;

            FanfictionToChapter.create({
                fanfictionId: req.body.funId,
                chaptersId: chapterId
            })
            .then(() => {
                return res.json({ message: 'added' });
            })
        })
    })

}

exports.getChapters = (req, res) => {
    const finalData = [];

    FanfictionToChapter.findAll({
        where: { fanfictionId: req.params.id },
        include: [Chapters]
    })
    .then((chapters) => {
        for (chapter of chapters) {
            finalData.push(chapter.dataValues.chapter.dataValues)
        }

        finalData.sort((a, b) => a.order > b.order ? 1 : -1);
        return res.send(finalData);
    })
}

exports.editChapter = (req, res) => {
    Chapters.findOne({
        where: { id: req.params.id }
    })
    .then((chapter) => {
        return res.json(chapter);
    })
}

exports.changeChapter = (req, res) => {
    FanfictionToChapter.findOne({
        where: { chaptersId : req.body.id },
    })
    .then((data) => {
        const dataId = data.fanfictionId;

        Fanfictions.findOne({
            where: { id: dataId },
        })
        .then((fun) => {
            const fanfiction = fun.title;

            Fanfictions.update({ title: fanfiction },
                { where: { id: dataId } })
        })
    })

    Chapters.update({
            title: req.body.title,
            image: req.body.image,
            text: req.body.text
        },
        {
            where: { id: req.body.id }
        })
        .then(() => {
            return res.json({ message: 'update' });
        })
}

exports.deleteChapter = (req, res) => {
    for (val of req.body.chapters) {
        Chapters.update({
                order: val.order }, {
                where: { id: val.id }
            })
            .then(() => { })
    }
    
    FanfictionToChapter.destroy({
        where: { chaptersId: req.body.chapter.id },
        include: [Chapters]
    })
    .then(() => {
        Chapters.destroy({
                where: { id: req.body.chapter.id }
            })})

    return res.json({ message: 'deleted' });
}

exports.sortChapter = (req, res) => {
    for (val of req.body) {
        Chapters.update(
            { order: val.order },
            { where: { id: val.id } })
    }
    return res.json({ message: 'update' });
}

exports.getNavChapter = (req, res) => {
    const finalData = [];

    FanfictionToChapter.findAll({
        where: { fanfictionId: req.body.id },
        include: [Chapters]
    })
    .then((chapters) => {
        for (chapter of chapters) {
            finalData.push(chapter.dataValues.chapter.dataValues)
        }

        finalData.sort((a, b) => a.order > b.order ? 1 : -1);
        let nav = {};

        finalData.forEach((item, i, arr)=>{
            if(item.id == req.body.chapterId){
                if(arr[i + 1]){
                    nav.next = arr[i + 1]
                }
                if(arr[i - 1]){
                    nav.prev = arr[i - 1]
                }
            }
        })

        return res.send(nav);
    })
}

exports.getViewChapter = (req, res) => {
    Fanfictions.findOne({
        where: { id: req.body.id },
    })
    .then((fanfiction) => {
        if (!fanfiction) {
            return res.json({ message: 'none fanfiction' });
        }
        Chapters.findOne({
            where: { id: req.body.chapterId },
            include: [Likes]
        })
        .then((chapter) => {
            if (!chapter) {
                return res.json({ message: 'none chapter' });
            }
            return res.json(chapter);
        })
    })
}

exports.likesChapter = async (req, res) => {
    const { chapterId, userId } = req.body;
    
    const userInBase = await Likes.findOne({
        where: { userId: userId, chapterId: chapterId }
    })
    if(!userInBase) {
        await Likes.create({
          userId: userId,
          value : 1,
          chapterId: chapterId
    })} else {
        let tmpVal = !userInBase.value;

        await Likes.update({ value: tmpVal }, {
          where: { userId: userId, chapterId: chapterId }
        })
      }
      await Likes.findAll({
        where: { chapterId: chapterId }
      })
      .then(async (likesChapter) =>{
        let overall = 0; 

        for(let val of likesChapter) {
          overall += val.value
        }
        await Chapters.update({ overall_likes: overall }, {
            where: { id: chapterId }
          })
        const chapter = await Chapters.findOne({where:{ id: +chapterId }})

        return res.send(chapter);
      })
}