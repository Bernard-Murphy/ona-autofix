const fs = require("fs");
const app = require("express")();
require("dotenv").config();

const port = process.env.PORT;
const interval = process.env.INTERVAL;

const run = () => {
  try {
    console.log(fs.existsSync("/var/opt/remi/php82/run/php-fpm"));
  } catch (err) {
    console.log("An error occurred:\n", err);
  }
  setTimeout(run, 1000 * 60 * Number(interval));
};

app.listen(port, () => {
  console.log("ona forum autofix running on port", port);
  console.log(`Will run every ${interval} minutes`);
  run();
});
