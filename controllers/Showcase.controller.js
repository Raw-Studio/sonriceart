const Showcase = require('../models/showcase.model');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class ShowcaseController {
  static async findAll(req, res) {
    await Showcase.find({}, (err, artworks) => {
      if (err) throw err;
      res.render('admin/listShowcase', {
        layout: false,
        items: artworks,
      });
    })
  }

  static async pageAdd(req, res) {
    res.render('admin/addShowcase', {
      layout: false,
      item: '',
      method: 'add'
    });
  }

  static async save(req, res) {
    let { title, order } = req.body;
    console.log(req.files[0]);
    const { path } = req.files[0];
    const showcase = new Showcase({
      title: title,
      image: path,
      order: order,
      nameInCloud: req.files[0].filename,
    })
    await showcase.save((err) => {
      if (err) throw err;
      console.log('Showcase saved to the db')
      res.redirect('/admin/showcase');
    })
    //const artworks = new Showcase({title, album})
  }

  static async deleteById(req, res) {
    const { _id } = req.params;
    await Showcase.find({ _id }, async (err, showcase) => {
      await cloudinary.uploader.destroy(showcase.nameInCloud,
        async (error, result) => {
          await Showcase.deleteOne({ _id }, (err) => {
            if (err) throw err;
            console.log("Deleted");
            res.redirect('/admin/showcase');
          })
        });
    })
  }


  static async getUpdatePageById(req, res) {
    const { _id } = req.params;
    await Showcase.findOne({ _id }, (err, showcase) => {
      if (err) throw err;
      res.render('admin/addShowcase', {
        layout: false,
        item: showcase,
        method: 'edit'
      });
    })
  }

  static async updateById(req, res) {
    const { _id, title, order } = req.body;
    if (req.files[0] !== undefined && req.files[0] !== null) {
      const { path } = req.files[0];
      await Showcase.findOneAndUpdate({ _id }, {
        title: title, image: path, nameInCloud: req.files[0].filename, order: order,
      }, (err, showcase) => {
        if (err) throw err;
        res.redirect('/admin/showcase');
      })
    }
    else {
      await Showcase.findOneAndUpdate({ _id }, { title: title }, (err, showcase) => {
        if (err) throw err;
        res.redirect('/admin/showcase');
      })
    }
  }
}

module.exports = ShowcaseController