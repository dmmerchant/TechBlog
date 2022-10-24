const sequelize = require('../config/connection');
const seedComments = require('./commentData');
const seedPosts = require('./postData');
const seedUsers = require('./userData');
const seedTags = require('./tagData');
const seedPostTags = require ('./posttagData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedTags();

  await seedPosts();

  await seedComments();

  await seedPostTags();

  process.exit(0);
};

seedAll();