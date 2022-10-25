const router = require('express').Router();
const { Post, Comment, Tag, PostTag, User } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: Post
        },
        { model: User}
      ],
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comments found!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id,{
      include: [
        {
          model: Post
        },
        { model: User}
      ],
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comments found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new post
router.post('/', async (req, res) => {
  const body = req.body
  console.log({ ...body, date_created: Date.now(),user_id: req.session.userID })
  try {
    const newComment = Comment.create( { ...body, date_created: Date.now(),user_id: req.session.userID } )
    res.status(200).json(newComment);
  }catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  var body = req.body
  try {
    const [affectedRows] = await Comment.update({...body,date_modified: Date.now()}, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
