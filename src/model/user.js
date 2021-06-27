const { post } = require('../routers/posts');

if (!global.db) {
    const pgp = require('pg-promise')();
    console.log(`==DEBUG== process.env.DB_URL = ${process.env.DB_URL}`);
    db = pgp(process.env.DB_URL);
  }
  
  function list(id) {
    console.log(id);
    console.log("hello");
    const sql = `
          SELECT *
          FROM users
          WHERE id = $1
      `;
      
    return db.any(sql, [id]);
  }

  async function create(userName) {
    //console.log("create = ",userName);
    const pre_sql = `
          SELECT *
          FROM users
          WHERE name = $1
      `;
    let data = await db.any(pre_sql, [userName]);
    var createFlag = 0;
    if (typeof data[0] === 'undefined'){
      createFlag = 1;
    }
    else{
      createFlag = 0;
    }
    //console.log(createFlag);
    //var flag = getPreviousData(userName);
    //console.log(flag);
    if (createFlag){
      const sql = `
      INSERT INTO users(name)
      VALUES ($<userName>)
      RETURNING *
      `;
      return db.one(sql, { userName });
    }
    else{
      return data[0];
    }
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
  