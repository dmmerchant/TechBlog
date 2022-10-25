const { PostTag } = require('../models');

const posttagdata = [
{
    "post_id": 3,
    "tag_id": 1
 },
 {
    "post_id": 1,
    "tag_id": 2
 },
 {
    "post_id": 2,
    "tag_id": 3
 },
 {
    "post_id": 3,
    "tag_id": 4
 },
 {
    "post_id": 1,
    "tag_id": 5
 },
 {
    "post_id": 2,
    "tag_id": 6
 }
];

const seedPostTags = () => PostTag.bulkCreate(posttagdata);

module.exports = seedPostTags;