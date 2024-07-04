const fs = require("fs");
const { exec } = require("child_process");
const purgeChats = require("./purgeChats");
const app = require("express")();
require("dotenv").config();

// sudo nohup "$(which node)" index.js > autofix.log 2> err.log &
const port = process.env.PORT;
const interval = process.env.INTERVAL;

const run = async () => {
  try {
    // if (!fs.existsSync("/var/opt/remi/php82/run/php-fpm/www.sock")) {
    //   console.log("Forum down", new Date());
    //   exec("sudo sh -c 'sh restore.sh'", (err, stdout, stderr) => {
    //     if (err) console.log("err", err);
    //     if (stderr) console.log("stderr", stderr);
    //     if (stdout) console.log("stdout", stdout);
    //   });
    // }
    await purgeChats();
  } catch (err) {
    console.log("An error occurred:\n", err);
  }
  setTimeout(run, 1000 * 60 * Number(interval));
};

app.listen(port, () => {
  console.log("ona forum autofix running on port", port);
  console.log(`Running every ${interval} minutes`);
  run();
});
