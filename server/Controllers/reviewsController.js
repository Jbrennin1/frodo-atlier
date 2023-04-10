const Models = require('../Models/Models.js');

reviewController = {
  get: (req, res) => {
    let params = {
      product_id: req.params.id,
      sort: req.params.sort
    }
    Models.reviews.getReviews(params)
      .then(response => {
        console.log('res', response.data)
        res.send(response.data)
      })
      .catch(err => {
        res.send(err.data)
      })
  },
  post: (req, res) => {
    console.log(req.body)
    Models.reviews.postReview(req.body)
      //req.body should include: product_id, rating (1-5), summary, body, recommend(bool), name, email, photos(array), characteristics(obj)
      .then(response =>
        res.status(201).send(response.data)
      )
      .catch(err =>
        console.log(err.data, 'Failed to post review!')
      )
  },
  getMeta: (req, res) => {
    Models.reviews.getMeta({ product_id: req.params.id })
      .then(response =>
        res.send(response.data)
      )
      .catch(err =>
        res.send(err.data)
      )
  },
  markHelpful: (req, res) => {
    if (req.cookies.votedReviews) {
      let alreadyVoted = req.cookies.votedReviews.split(',')
      if (alreadyVoted.includes(req.body.review_id.toString())) {
        res.end('Feedback already recieved')
        return
      } else {
        alreadyVoted.push(req.body.review_id)
      }
      res.cookie('votedReviews', alreadyVoted.join(','))
      Models.reviews.markHelpful(req.body)
      .then(response => res.end('Thanks for your feedback!'))
      .catch(err => res.end(err.data))
    } else {
      res.cookie('votedReviews', req.body.review_id)
      Models.reviews.markHelpful(req.body)
        .then(response => res.end('Thanks for your feedback!'))
        .catch(err => res.end(err.data))
    }
  },
  markReported: (req, res) => {
    if (req.cookies.votedReviews) {
      let alreadyVoted = req.cookies.votedReviews.split(',')
      if (alreadyVoted.includes(req.body.review_id.toString())) {
        res.end('Feedback already recieved')
        return
      } else {
        alreadyVoted.push(req.body.review_id)
      }
      res.cookie('votedReviews', alreadyVoted.join(','))
      Models.reviews.markReported(req.body)
      .then(response => res.end('Thanks for your feedback!'))
      .catch(err => res.end(err.data))
    } else {
      res.cookie('votedReviews', req.body.review_id)
      Models.reviews.markReported(req.body)
        .then(response => res.end('Thanks for your feedback!'))
        .catch(err => res.end(err.data))
    }
  }
}


module.exports = reviewController;