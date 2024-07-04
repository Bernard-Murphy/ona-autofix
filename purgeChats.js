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
        // `update xf_conversation_message set user_id = "0", username = "guest", message = "This message has been pruned" where message_date < ${
        //   new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime() *
        //   1000
        // } and message != "This message has been pruned"`,
        `select * from xf_conversation_message where message_date < ${
          new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime() *
          1000
        }`,
        (err, results) => {
          try {
            if (err) throw err;
            else {
              // console.log(
              //   `${
              //     results.changedRows
              //   } messages pruned at ${new Date().toISOString()}`
              // );
              console.log("before", results.length);
            }
          } catch (err) {
            console.log("Error", err);
          }
        }
      );
      sql.query(
        // `update xf_conversation_message set user_id = "0", username = "guest", message = "This message has been pruned" where message_date < ${
        //   new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime() *
        //   1000
        // } and message != "This message has been pruned"`,
        `select * from xf_conversation_message`,
        (err, results) => {
          try {
            if (err) throw err;
            else {
              // console.log(
              //   `${
              //     results.changedRows
              //   } messages pruned at ${new Date().toISOString()}`
              // );
              console.log("all", results.length);
            }
          } catch (err) {
            console.log("Error", err);
          }
        }
      );

      sql.end();
    } catch (err) {
      console.log(new Date().toISOString(), "purgeChats error", err);
    }

    resolve();
  });

module.exports = purgeChats;
