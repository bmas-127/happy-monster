const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const postModel = require('../model/posts.js');
const userModel = require('../model/user.js');
const animalModel = require('../model/animals.js');
const systemModel = require('../model/system.js');

const router = express.Router();

router.use(express.json());

// list animal
router.get('/animals', function (req, res, next) {
  const { id, species, status } = req.query;
  animalModel
    .list(id, species, status)
    .then((posts) => {
      res.json(posts);
    })
    .catch(next);
});

// create animal
router.post('/animals', function (req, res, next) {
  const { userid, species } = req.body;
  if (!userid || !species) {
    const err = new Error('userid and species are required');
    err.status = 400;
    throw err;
  }
  animalModel
    .create(userid, species)
    .then((post) => {
      res.json(post);
    })
    .catch(next);
});

// update animal
router.post('/animals/update', function (req, res, next) {
  const { aid, update } = req.body;
  if (!aid || !update) {
    const err = new Error('Mood and text are required');
    err.status = 400;
    throw err;
  }
  animalModel
    .update(aid, update)
    .then((post) => {
      res.json(post);
    })
    .catch(next);
});

// post list
router.get('/posts', function (req, res, next) {
  const { task, id, ts } = req.query;

  postModel
    .list(task, id, ts)
    .then((posts) => {
      res.json(posts);
    })
    .catch(next);
});

// post create
router.post('/posts', function (req, res, next) {
  const { uid, score, text } = req.body;
  if (!uid || !score || !text) {
    const err = new Error('Mood and text are required');
    err.status = 400;
    throw err;
  }
  postModel
    .create(uid, score, text)
    .then((post) => {
      res.json(post);
    })
    .catch(next);
});

// post update
router.post('/posts/update', function (req, res, next) {
  const { postid, text } = req.body;
  if (!postid || !text) {
    const err = new Error('postid and text are required');
    err.status = 400;
    throw err;
  }
  postModel
    .update(postid, text)
    .then((post) => {
      res.json(post);
    })
    .catch(next);
});

// create user

// list user
router.get('/users', function (req, res, next) {
  const { id} = req.query;
  userModel
    .list(id)
    .then((posts) => {
      res.json(posts);
    })
    .catch(next);
});

// system update
router.post('/systems', function (req, res, next) {
  systemModel
    .update()
    .then((posts) => {
      res.json(posts);
    })
    .catch(next);
});




// // Vote
// router.post(
//   '/posts/:id/:mood(clear|clouds|drizzle|rain|thunder|snow|windy)Votes',
//   function (req, res, next) {
//     const { id, mood } = req.params;
//     if (!id || !mood) {
//       const err = new Error('Post ID and mood are required');
//       err.status = 400;
//       throw err;
//     }
//     voteModel
//       .create(id, mood)
//       .then((post) => {
//         res.json(post);
//       })
//       .catch(next);
//   }
// );



module.exports = router;
