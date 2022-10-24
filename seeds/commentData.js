const { Comment } = require('../models');

const commentdata = [
{
    "user_id": 2,
    "date_created": Date.now(),
    "comment": "This is my comment",
    "post_id": 1
 },
 {
    "user_id": 3,
    "date_created": Date.now(),
    "comment": "This is my comment",
    "post_id": 2
 },
 {
    "user_id": 1,
    "date_created": Date.now(),
    "comment": "This is my comment",
    "post_id": 3
 },
 {
    "user_id": 1,
    "date_created": Date.now(),
    "comment": "This is my comment",
    "post_id": 3
 },
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;