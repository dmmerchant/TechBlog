const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const postRoutes = require('./post-routes');
const userRoutes = require('./userRoutes');

router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);
router.use('/user', userRoutes);

module.exports = router;