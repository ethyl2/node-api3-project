const express = require('express');
const postDb = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  postDb.getById(req.body.id)
    .then(response => {
        req.postId = response.data;
        next();
    })
    .catch(err => {
      res.status(400).json({message: "invalid post id"})
    });
}

module.exports = router;
