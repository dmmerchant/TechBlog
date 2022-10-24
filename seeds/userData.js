const { User } = require('../models');

const userdata = [
{
    "username": "Yoda",
    "email": "yoda@gmail.com",
    "password": "yodapassword"
 },
 {
   "username": "HanSolo",
   "email": "hansolo@gmail.com",
   "password": "hansolopassword"
},
{
   "username": "LukeSkywalker",
   "email": "lukeskywalker@gmail.com",
   "password": "lukeskywalkerpassword"
}
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;