const Artwork = require('../models/artwork.model');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class ArtworkController {
  static findAll(req, res) {
    Artwork.find({}).sort('album').sort('order').exec((err, artworks) => {
      if (err) throw err;
      res.render('admin/listArtworks', {
        layout: false,
        items: artworks,
      });
    })
  }

  static async pageAdd(req, res) {
    res.render('admin/addArtwork', {
      layout: false,
      item: '',
      method: 'add'
    });
  }

  static async save(req, res) {
    let { title, album, detail, order } = req.body;
    const { path } = req.files[0];
    console.log(req.files[0]);
    //const path = `/uploads/${req.files[0].filename}`;
    const artwork = new Artwork({
      title: title,
      coverImage: path,
      album: album,
      nameInCloud: req.files[0].filename,
      detail: detail,
      order: order
    })
    await artwork.save((err) => {
      if (err) throw err;
      console.log('Artwork saved to the db')
      res.redirect('/admin/artworks');
    })
    //const artworks = new Artwork({title, album})
  }

  static async deleteById(req, res) {
    const { _id } = req.params;
    await Artwork.find({ _id }, async (err, artwork) => {
      await cloudinary.uploader.destroy(artwork.nameInCloud,
        async (error, result) => {
          await Artwork.deleteOne({ _id }, (err) => {
            if (err) throw err;
            console.log("Deleted");
            res.redirect('/admin/artworks');
          })
        });
    })
  }


  static async getUpdatePageById(req, res) {
    const { _id } = req.params;
    await Artwork.findOne({ _id }, (err, artwork) => {
      if (err) throw err;
      res.render('admin/addArtwork', {
        layout: false,
        item: artwork,
        method: 'edit'
      });
    })
  }

  static async updateById(req, res) {
    const { _id, title, detail, album, link } = req.body;
    if (req.files[0] !== undefined && req.files[0] !== null) {
      const { path } = req.files[0];
      await Artwork.findOneAndUpdate({ _id }, {
        title: title, detail: detail, album: album, coverImage: path, nameInCloud: req.files[0].filename,
      }, (err, artwork) => {
        if (err) throw err;
        res.redirect('/admin/artworks');
      })
    }
    else {
      await Artwork.findOneAndUpdate({ _id }, { title: title, detail: detail, album: album }, (err, artwork) => {
        if (err) throw err;
        res.redirect('/admin/artworks');
      })
    }
  }

  static showOrderIllustrationConcept(req, res, next) {
    Artwork.find({}).sort('order').exec((err, artworks) => {
      res.render('admin/artworks/listOrder', {
        artworks: artworks,
        layout: false
      })
    })
  }

  static async editOrderIllustrationConcept(req, res, next) {
    const { _id, order } = req.body;
    for (let i = 0; i < _id.length; i++) {
      await Artwork.findOneAndUpdate({ _id: _id[i] }, {
        order: order[i]
      }, (err, artwork) => {
        if (err) throw err;
      })
    }
    res.redirect('/admin/artworks/');
  }

  static showOrderIllustrationConcept(req, res, next) {
    Artwork.find({ album: "Illustration - Concept" }).sort('order').exec((err, artworks) => {
      res.render('admin/artworks/listOrder', {
        artworks: artworks,
        layout: false,
        album: "illustration_concept"
      })
    })
  }

  static async editOrderIllustrationConcept(req, res, next) {
    const { _id, order } = req.body;
    for (let i = 0; i < _id.length; i++) {
      await Artwork.findOneAndUpdate({ _id: _id[i], album: "Illustration - Concept" }, {
        order: order[i]
      }, (err, artwork) => {
        if (err) throw err;
      })
    }
    res.redirect('/admin/artworks/');
  }

  static showOrder3DModeling(req, res, next) {
    Artwork.find({ album: "3D Modeling" }).sort('order').exec((err, artworks) => {
      res.render('admin/artworks/listOrder', {
        artworks: artworks,
        layout: false,
        album: "3dmodeling"
      })
    })
  }

  static async editOrder3DModeling(req, res, next) {
    const { _id, order } = req.body;
    for (let i = 0; i < _id.length; i++) {
      await Artwork.findOneAndUpdate({ _id: _id[i], album: "3D Modeling" }, {
        order: order[i]
      }, (err, artwork) => {
        if (err) throw err;
      })
    }
    res.redirect('/admin/artworks/');
  }

  static showOrderAnimation(req, res, next) {
    Artwork.find({ album: "Animation" }).sort('order').exec((err, artworks) => {
      res.render('admin/artworks/listOrder', {
        artworks: artworks,
        layout: false,
        album: "animation"
      })
    })
  }

  static async editOrderAnimation(req, res, next) {
    const { _id, order } = req.body;
    for (let i = 0; i < _id.length; i++) {
      await Artwork.findOneAndUpdate({ _id: _id[i], album: "Animation" }, {
        order: order[i]
      }, (err, artwork) => {
        if (err) throw err;
      })
    }
    res.redirect('/admin/artworks/');
  }

}

module.exports = ArtworkController