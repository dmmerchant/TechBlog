const router = require('express').Router();
const { Post, Comment, Tag, PostTag, User } = require('../../models');

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
router.post('/', (req, res) => {
  Comment.create(req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  Comment.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      // find all associated tags from ProductTag
      return PostTag.findAll({ where: { post_id: req.params.id } });
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
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
