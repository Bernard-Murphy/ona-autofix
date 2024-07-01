const mysql = require("mysql");

const purgeChats = () =>
  new Promise((resolve) => {
    try {
      const sql = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
      });

      sql.connect();

      sql.query("SHOW TABLES", (err, results) => {
        try {
          if (err) throw err;
          else {
            console.log("tables", results);
          }
        } catch (err) {
          console.log("Error", err);
        }
      });

      sql.end();
    } catch (err) {
      console.log("purgeChats error", err);
    }

    resolve();
  });

module.exports = purgeChats;
