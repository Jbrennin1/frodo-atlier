const { Pool } = require('pg');

const pool = new Pool ({
  user: 'brenninjoiner',
  host: 'ec2-3-131-160-218.us-east-2.compute.amazonaws.com',
  database: 'sdc',
  password: '',
  port: 5432,
})


module.exports = pool