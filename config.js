try {
  switch (process.env.NODE_ENV) {
    case 'production':
      process.env.DB_URL = `postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
      break;
    default:
      process.env.DB_URL = 'postgres://postgres@localhost:5432/happymonster';
      break;
  }
} catch (err) {
  console.log(
    err,
    '\n\nError configuring the project. Have you set the environment veriables?'
  );
}
