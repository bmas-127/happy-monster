if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
  }
  
  function list(id) {
    console.log(id);
    
    const sql = `
          SELECT *
          FROM users
          WHERE id = $1
      `;
      
    return db.any(sql, [id]);
  }
  
  function create(userid, score, text) {
    const sql = `
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
  