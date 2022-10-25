const { Tag } = require('../models');

const tagdata = [
{
    "tag_name": "CSS"
 },
 {
   "tag_name": "JavaScript"
},
{
   "tag_name": "Node"
},
{
   "tag_name": "HandleBars"
},
{
   "tag_name": "MVC"
},
{
   "tag_name": "Blazor"
}
];

const seedTags = () => Tag.bulkCreate(tagdata);

module.exports = seedTags;