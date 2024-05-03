const db = require('../config/connection');
const { Monster } = require('../models');
const cleanDB = require('./cleanDB');

const monsterData = require('./monsterData.json');

db.once('open', async () => {
  try {
    // Clean the Monster collection
    await cleanDB('Monster');

    // Insert new data
    await Monster.insertMany(monsterData);

    console.log('Monsters seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding monsters:', error);
    process.exit(1);
  }
});