const controller = require('./Controllers/controllers.js');
const router = require('express').Router();
const {getReviews, getReviewsMeta} = require('./Models/reviewQuery')

//questions
router.get('/questions', controller.questions.getQuestions);
router.get('/questions/answers', controller.questions.getAnswers);
router.put('/questions/answer/helpful', controller.questions.updateHelpfulnessAnswer);
router.put('/questions/question/helpful',controller.questions.updateHelpfulnessQuestion)
router.post('/questions/questionId/answer', controller.questions.submitAnswer)
router.post('/questions/ask', controller.questions.submitQuestion)
router.put('/answer/report', controller.questions.reportAnswer)

//reviews
router.get('/reviews/:id/:sort', controller.reviews.get);
router.post('/review', controller.reviews.post);
router.get('/meta/:id', controller.reviews.getMeta);
router.put('/reviews/helpful', controller.reviews.markHelpful);
router.put('/reviews/report', controller.reviews.markReported);

//products
router.get('/products', controller.products.get);
router.get('/product/:id/styles', controller.products.getStyle);
router.get('/product/:id/related', controller.products.getRelated);
router.get('/product/:id', controller.products.getOne);
router.post('/cart', controller.products.addCart);
router.get('/cart', controller.products.getCart);

router.get('/reviews' , async (req, res) => {
  console.log('got')
  var page = req.query.page || 1
  var count = req.query.count || 5
  var sort = req.query.sort || 'newest'
  var product_id = req.query.product_id || 1
  try {
    const reviews = await getReviews(page, count, sort, product_id);
    console.log(reviews)
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(reviews))
  } catch (err) {
    console.log(err)
    res.status(500).send('Error retrieving reviews')
  }
})

router.get('/reviews/meta', async (req, res) => {
  var product_id = req.query.product_id || 1
  try {
    const meta = await getReviewsMeta(product_id)
    console.log(meta)
    res.send(JSON.stringify(meta))
  } catch (err) {
    consle.log(err)
    res.status(500).send('Error retrieving meta data')
  }
})

router.get('/loaderio-087881e9227b136a358fa1d55489a32b.txt', (req, res) => {
  res.sendFile('../loaderio-087881e9227b136a358fa1d55489a32b (1).txt', { root: '/' });
});


module.exports = router;