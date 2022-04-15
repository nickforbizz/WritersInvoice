// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db_Sequelize = require('../../utils/db')
export default function handler(req, res) {

  // Test DB
  db_Sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  res.status(200).json({ name: 'John Doe' })
}
