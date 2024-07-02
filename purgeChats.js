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
        // `select * from xf_conversation_message where message_date < ${
        //   new Date(new Date().setMonth(new Date().getMonth() - 1)).getTime() *
        //   1000
        // } and message != "This message has been pruned"`,
        // "select * from xf_conversation_message where message like '%Thanks, I doubt he is hacking anything. Unless it%'",
        `update xf_conversation_message set user_id = '0', username = 'guest', message = 'Message pruned' where message like '<div style="font-style: italic;">Message pruned</div>'`,
        (err, results) => {
          try {
            if (err) throw err;
            else {
              console.log(`${results.changedRows} messages pruned`);
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
