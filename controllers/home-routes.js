const router = require('express').Router();
const { Comment, Post, User} = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: Comment,
          include: {model: User},
          attributes: {currentUser:req.session.userID}
        },
        {
          model: User
        },
      ]
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    posts.forEach(element => {
      element = {...element,currentUser:req.session.userID}
    });
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      userID: req.session.userID,
      username: req.session.username,
      pageName: 'Tech Blog Homepage'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  console.log(req.session.userID)
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: Comment,
          include: {model: User}
        },
        {
          model: User
        },
      ],
      where: {user_id: req.session.userID}
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
      userID: req.session.userID,
      username: req.session.username,
      pageName: 'Dashboard'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
    try {
      const dbPostData = await Post.findByPk(req.params.id,{
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

      const post = dbPostData.get({ plain: true });

      res.render('postView', {
      post,
      loggedIn: req.session.loggedIn,
      userID: req.session.userID,
      pageName: 'View Post: ' + dbPostData.title
    });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/post/edit/:id', withAuth, async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
    try {
      const dbPostData = await Post.findByPk(req.params.id,{
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

      const post = dbPostData.get({ plain: true });

      res.render('edit-post', {
      post,
      loggedIn: req.session.loggedIn,
      userID: req.session.userID,
      pageName: 'Edit Post: ' + dbPostData.title
    });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/comment/edit/:id', withAuth, async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
    try {
      const dbCommentData = await Comment.findByPk(req.params.id);

      const comment = dbCommentData.get({ plain: true });
      console.log(comment);

      res.render('edit-comment', {
      comment,
      loggedIn: req.session.loggedIn,
      userID: req.session.userID,
      pageName: 'Edit Comment'
    });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/post/edit/:id', withAuth, async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
    try {
      const dbPostData = await Post.findByPk(req.params.id,{
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

      const post = dbPostData.get({ plain: true });
      console.log(post);
      console.log(dbPostData);
      res.render('edit-post', {
      post,
      loggedIn: req.session.loggedIn,
      userID: req.session.userID,
      pageName: 'Edit Post: ' + dbPostData.title
    });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login',{pageName: 'Login'});
});

module.exports = router;


router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup',{pageName: 'Sign Up'});
});

router.get('/logout', async (req, res) => {
  
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: Comment
        },
        {
          model: User
        }
      ],
    });
    req.session.save(() => {
      req.session.loggedIn = false;
      req.session.userID = '';
      req.session.username = '';
    });
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    res.render('homepage', {
      posts,
      loggedIn: false,
      userID: '',
      pageName: 'Tech Blog Homepage'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;