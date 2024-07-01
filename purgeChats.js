const mysql = require("mysql2");

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

      sql.query(
        "select message_date from xf_conversation_message limit 1",
        (err, results) => {
          try {
            if (err) throw err;
            else {
              console.log("tables", results);
              console.log("now", new Date().getTime());
              console.log(
                "month",
                new Date(
                  new Date().setMonth(new Date().getMonth() - 1)
                ).getTime()
              );
              console.log("message", new Date(results[0].message_date));
            }
          } catch (err) {
            console.log("Error", err);
          }
        }
      );

      sql.end();
    } catch (err) {
      console.log("purgeChats error", err);
    }

    resolve();
  });

module.exports = purgeChats;
