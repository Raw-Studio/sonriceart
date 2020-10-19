const Tutorial = require('../models/tutorial.model')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class TutorialController {
  static findAll = async (req, res) => {
    await Tutorial.find({}, (err, tutorial) => {
      if (err) throw err;
      res.render('admin/listTutorial', {
        layout: false,
        items: tutorial
      });
    })
  }

  static pageAdd = (req, res) => {
    res.render('admin/addTutorial', {
      layout: false,
      item: '',
      method: 'add'
    });
  }

  static async save(req, res) {
    let { title, album, link, big, duration } = req.body;
    if (big === undefined) {
      big = 'small'
    }
    const { path } = req.files[0];
    //const path = `/uploads/${req.files[0].filename}`;
    const tutorial = new Tutorial({
      title: title,
      coverImage: path,
      album: album,
      link: link,
      big: big,
      duration: duration,
      nameInCloud: req.files[0].filename
    })
    await tutorial.save((err) => {
      if (err) throw err;
      console.log('Tutorial saved to the db')
      res.redirect('/admin/tutorials');
    })
    //const artworks = new Artwork({title, album})
  }

  static async deleteById(req, res) {
    const { _id } = req.params;
    await Tutorial.find({ _id }, async (err, tutorial) => {
      await cloudinary.uploader.destroy(tutorial.nameInCloud,
        async (error, result) => {
          await Tutorial.deleteOne({ _id }, (err) => {
            if (err) throw err;
            console.log("Deleted");
            res.redirect('/admin/tutorials');
          })
        });
    })
  }

  static async getUpdatePageById(req, res) {
    const { _id } = req.params;
    await Tutorial.findOne({ _id }, (err, tutorial) => {
      if (err) throw err;
      res.render('admin/addTutorial', {
        layout: false,
        item: tutorial,
        method: 'edit'
      });

    })
  }

  static async updateById(req, res) {
    const { _id, title, album, link, big, duration } = req.body;
    console.log(duration);
    if (req.files[0] !== undefined && req.files[0] !== null) {
      const { path } = req.files[0];
      await Tutorial.findOneAndUpdate({ _id }, {
        title: title, link: link, album: album, coverImage: path, nameInCloud: req.files[0].filename, big: big, duration: duration,
      }, (err, tutorial) => {
        if (err) throw err;
        res.redirect('/admin/tutorials');
      })
    }
    else {
      await Tutorial.findOneAndUpdate({ _id }, { title: title, link: link, album: album, big: big, duration: duration }, (err, tutorial) => {
        if (err) throw err;
        res.redirect('/admin/tutorials');
      })
    }
  }
}

module.exports = TutorialController