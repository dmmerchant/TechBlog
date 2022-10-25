const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: Comment,
          include: {model: User}
        },
        {
          model: User
        }
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No posts found!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id,{
      include: [
        {
          model: Comment,
          include: {model: User}
        },
        {
          model: User
        }
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No posts found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// create new post
router.post('/', withAuth, async (req, res) => {
  const body = req.body;
  console.log("this is posting")
  try {
    const newPost = await Post.create({ ...body, date_created: Date.now() ,user_id: req.session.userID });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update product
router.put('/:id', withAuth, async (req, res) => {
  const body = req.body
  try {
    const [affectedRows] = await Post.update({...body,date_modified: Date.now()}, {
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

router.delete('/:id', withAuth,  async (req, res) => {
  // delete one product by its `id` value
  try {
    const [affectedRows] = Post.destroy({
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

module.exports = router;
