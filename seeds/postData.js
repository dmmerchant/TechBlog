const { Post } = require('../models');

const postdata = [
{
    "user_id": 1,
    "date_created": Date.now(),
    "title": "A post about CSS",
    "post": "This is a post about CSS and what its all about."
 },
 {
    "user_id": 1,
    "date_created": Date.now(),
    "title": "A post about JavaScript",
    "post": "This is a post about JavaScript and what its all about."
 },
 {
    "user_id": 2,
    "date_created": Date.now(),
    "title": "A post about Blazor",
    "post": "This is a post about Blazor and what its all about."
 },
 {
    "user_id": 3,
    "date_created": Date.now(),
    "title": "A post about HandleBars",
    "post": "This is a post about HandleBars."
 },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;