if (!global.db) {
  const pgp = require('pg-promise')();
  console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
  db = pgp(process.env.DB_URL);
}

function list(whose = '', id) {
  const where = [];
  where.push( (whose == 'others') ? 'id != $1' : 'id = $1' ) ;
  
  const sql = `
        SELECT *
        FROM posts
        ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY random()
        LIMIT 6
    `;
    
  return db.any(sql, [id]);
}

function create(userid, score, text) {
  const sql = `
        BEGIN TRANSACTION;
        Update users
        SET dailyNote = dailyNote + 1
        WHERE id = $<userid>;

        Update userAnimal
        SET animalStatus = 'born'
        FROM animals, users 
        WHERE users.dailyNote = 3
        AND useranimal.userid = 1
        AND animalStatus = 'egg'
        AND userAnimal.feedingDays = animals.breedingDays - 1
        AND userAnimal.animalId = animals.species;

        COMMIT;

        INSERT INTO posts ($<this:name>)
        VALUES ($<userid>, $<score>, $<text>)
        RETURNING *

    `;
  return db.one(sql, { userid, score, text });
}

function update(postid, text){
  const sql = `
        UPDATE posts
        SET text = $1
        WHERE id = $2
        RETURNING *
  `;

  return db.one(sql, [text, postid]);
}

module.exports = {
  list,
  create,
  update
};
