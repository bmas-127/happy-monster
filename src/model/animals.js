const moment = require('moment');

if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
  }
  
  function list(id, species='', status) {
    const where = [];
    where.push('userid = $1') ;
    if(species) where.push('animalid = $2');
    if(status)  where.push('animalstatus = $3');

    const sql = `
          SELECT *
          FROM useranimal
          ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
          ORDER BY random()
          LIMIT 6
      `;
      
    return db.any(sql, [id, species, status]);
  }
  
  function create(userid, species) {
    const sql = `
          INSERT INTO useranimal (userid, animalid, animalstatus)
          VALUES ($<userid>, $<species>, 'egg')
          RETURNING *
      `;
    return db.one(sql, { userid, species });
  }

  function update(aid, status){
    const sql = `
          UPDATE useranimal
          SET animalstatus = $1
          WHERE id = $2
          RETURNING *
    `;

    return db.one(sql, [status, aid]);
  }
  
  module.exports = {
    list,
    create,
    update,
  };
  