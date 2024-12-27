const mongoose = require("mongoose");

const db_URL = process.env.MONGO_URL;

const dbConnect = () => {
  mongoose
    .connect(db_URL)
    .then(() => console.log("DB is connected successfully"))
    .catch((error) => console.log(error.stack));
};

module.exports = dbConnect;
