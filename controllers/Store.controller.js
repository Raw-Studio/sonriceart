const Store = require('../models/store.model')
const cloudinary = require('cloudinary').v2;



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class StoreController {
  static findAll = async (req, res) => {
    await Store.find({}, (err, store) => {
      if (err) throw err;
      res.render('admin/listStore', {
        layout: false,
        items: store
      });
    })
  }

  static pageAdd = (req, res) => {
    res.render('admin/addStore', {
      layout: false,
      item: '',
      method: 'add'
    });
  }

  static async save(req, res) {
    let { title, album, link } = req.body;
    const { path } = req.files[0];
    //const path = `/uploads/${req.files[0].filename}`;
    const store = new Store({
      title: title,
      coverImage: path,
      album: album,
      link: link,
      nameInCloud: req.files[0].filename
    })
    await store.save((err) => {
      if (err) throw err;
      console.log('Store saved to the db')
      res.redirect('/admin/store');
    })
    //const artworks = new Artwork({title, album})
  }

  static async deleteById(req, res) {
    const { _id } = req.params;
    await Store.find({ _id }, async (err, store) => {
      await cloudinary.uploader.destroy(store.nameInCloud,
        async (error, result) => {
          await Store.deleteOne({ _id }, (err) => {
            if (err) throw err;
            console.log("Deleted");
            res.redirect('/admin/store');
          })
        });
    })
  }

  static async getUpdatePageById(req, res) {
    const { _id } = req.params;
    await Store.findOne({ _id }, (err, store) => {
      if (err) throw err;
      console.log(store);
      res.render('admin/addStore', {
        layout: false,
        item: store,
        method: 'edit'
      });
    })
  }
  static async updateById(req, res) {
    const { _id, title, album, link } = req.body;
    if (req.files[0] !== undefined && req.files[0] !== null) {
      const { path } = req.files[0];
      await Store.findOneAndUpdate({ _id }, {
        title: title, link: link, album: album, coverImage: path, nameInCloud: req.files[0].filename,
      }, (err, store) => {
        if (err) throw err;
        res.redirect('/admin/store');
      })
    }
    else {
      await Store.findOneAndUpdate({ _id }, { title: title, link: link, album: album }, (err, store) => {
        if (err) throw err;
        res.redirect('/admin/store');
      })
    }
  }
}

module.exports = StoreController