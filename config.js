try {
  switch (process.env.NODE_ENV) {
    case 'production':
      //process.env.DB_URL = `postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
      process.env.DB_URL = `postgres://postgres:abboioiph123@database-maintainedbybrook.c8ovmdszj96f.ap-northeast-1.rds.amazonaws.com:5432/happymonster`;
      break;
    default:
      process.env.DB_URL = 'postgres://postgres:abboioiph123@database-maintainedbybrook.c8ovmdszj96f.ap-northeast-1.rds.amazonaws.com:5432/happymonster';
      break;
  }
} catch (err) {
  console.log(
    err,
    '\n\nError configuring the project. Have you set the environment veriables?'
  );
}
   