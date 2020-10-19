const router = require('express').Router();
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../middlewares/isAuth');
const StoreController = require('../controllers/Store.controller');
const ArtworkController = require('../controllers/Artwork.controller');
const TutorialController = require('../controllers/Tutorial.controller');
const ShowcaseController = require('../controllers/Showcase.controller');

//router.use(upload.any());

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/404'
  })(req, res, next);
});

router.get('/', forwardAuthenticated, (req, res) => {
  res.redirect('/admin/login');
})

router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('admin/login', {
    layout: false
  });
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
  res.render('admin/dashboard', {
    layout: false
  });
})

router.get('/artworks', ensureAuthenticated, ArtworkController.findAll)

router.get('/artworks/add', ensureAuthenticated, ArtworkController.pageAdd)

router.post('/artworks/add', ensureAuthenticated, ArtworkController.save)

router.get('/artworks/delete/:_id', ensureAuthenticated, ArtworkController.deleteById)

router.get('/artworks/edit/:_id', ensureAuthenticated, ArtworkController.getUpdatePageById)

router.post('/artworks/edit/', ensureAuthenticated, ArtworkController.updateById)

router.get('/artworks/order/illustration_concept', ensureAuthenticated, ArtworkController.showOrderIllustrationConcept)

router.post('/artworks/order/illustration_concept', ensureAuthenticated, ArtworkController.editOrderIllustrationConcept)

router.get('/artworks/order/3Dmodeling', ensureAuthenticated, ArtworkController.showOrder3DModeling)

router.post('/artworks/order/3Dmodeling', ensureAuthenticated, ArtworkController.editOrder3DModeling)

router.get('/artworks/order/animation', ensureAuthenticated, ArtworkController.showOrderAnimation)

router.post('/artworks/order/animation', ensureAuthenticated, ArtworkController.editOrderAnimation)

router.get('/store', ensureAuthenticated, StoreController.findAll)

router.get('/store/add', ensureAuthenticated, StoreController.pageAdd)

router.post('/store/add', ensureAuthenticated, StoreController.save)

router.get('/store/delete/:_id', ensureAuthenticated, StoreController.deleteById)

router.get('/store/edit/:_id', ensureAuthenticated, StoreController.getUpdatePageById)

router.post('/store/edit/', ensureAuthenticated, StoreController.updateById)

router.get('/tutorials', ensureAuthenticated, TutorialController.findAll)

router.get('/tutorials/add', ensureAuthenticated, TutorialController.pageAdd)

router.post('/tutorials/add', ensureAuthenticated, TutorialController.save)

router.get('/tutorials/delete/:_id', ensureAuthenticated, TutorialController.deleteById)

router.get('/tutorials/edit/:_id', ensureAuthenticated, TutorialController.getUpdatePageById)

router.post('/tutorials/edit/', ensureAuthenticated, TutorialController.updateById)

router.get('/showcase', ensureAuthenticated, ShowcaseController.findAll)

router.get('/showcase/add', ensureAuthenticated, ShowcaseController.pageAdd)

router.post('/showcase/add', ensureAuthenticated, ShowcaseController.save)

router.get('/showcase/delete/:_id', ensureAuthenticated, ShowcaseController.deleteById)

router.get('/showcase/edit/:_id', ensureAuthenticated, ShowcaseController.getUpdatePageById)

router.post('/showcase/edit/', ensureAuthenticated, ShowcaseController.updateById)
// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/admin');
});

module.exports = router;