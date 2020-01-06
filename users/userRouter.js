const express = require('express');
const userDb = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  userDb.insert(req.body)
    .then(response => {
      console.log(response);
      res.status(201).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message: `There was a problem adding ${req.body.name} to the database.`,
        error: err});
    });
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  userDb.get()
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(err => {
      //console.log(err);
      res.status(500).json({message: 'The server was not able to get the users.', error: err});
    });

});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.body.id;
  //const id = req.params.id;
  userDb.getById(id)
    .then(response => {
      console.log(response)
      res.status(200).json(response);
    })
    .catch(err => {
      //console.log(err);
      res.status(500).json({message: `The server was not able to get the user of id ${id}.`, error: err});
    });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

/*
validateUserId()

    validateUserId validates the user id on every request that expects a user id parameter
    if the id parameter is valid, store that user object as req.user
    if the id parameter does not match any user id in the database, cancel the request 
    and respond with status 400 and { message: "invalid user id" }
*/

function validateUserId(req, res, next) {
  // do your magic!
  userDb.getById(req.body.id)
    .then(response => {
        req.user = response.data;
        next();
    })
    .catch(err => {
      res.status(400).json({message: "invalid user id"})
    });
}


/*
validateUser()

    validateUser validates the body on a request to create a new user
    if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
    if the request body is missing the required name field, cancel the request and respond with status 400 
    and { message: "missing required name field" }

*/
function validateUser(req, res, next) {
  // do your magic!
  if (Object.entries(req.body).length === 0) {
    res.status(400).json({ message: "missing user data" });
  } else if 
    (!req.body.name) {
      res.status(400).json({ message: "missing required name field" });
  } else {
      next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
