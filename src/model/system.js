if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
  }
  
  
  function update(){
    const sql = `    
      BEGIN TRANSACTION;
      Update userAnimal 
      SET animalStatus = 'death'
      FROM users
      WHERE userAnimal.userid = users.id 
      AND users.dailyNote = 0
      AND animalStatus = 'egg';

      Update users 
      SET canNewAnimal = 1, dailyNote = 2;
      COMMIT;
    `;
  
    return db.any(sql);
  }
  
  module.exports = {
    update
  };
  