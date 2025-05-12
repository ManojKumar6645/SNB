const mysql = require('mysql2');

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',       // or the host of your MySQL server
  user: 'root',            // your MySQL username
  password: '',            // your MySQL password
  database: 'snb_data' // your MySQL database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

module.exports = db;
