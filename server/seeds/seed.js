const db = require('../config/connection');
const { Monster } = require('../models');
const cleanDB = require('./cleanDB');

const monsterData = require('./monsterData.json');

db.once('open', async () => {
    await cleanDB('Monster');

    await Monster.insertMany(monsterData);

    console.log('Monsters seeded!');
    process.exit(0);
});
