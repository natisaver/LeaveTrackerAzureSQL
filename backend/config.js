const dotenv = require("dotenv");
dotenv.config()

// config for your database
const config = {
    server: `${process.env.SERVER}`,
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DB}`,
    driver: "msnodesqlv8",
    ssl: true
};

module.exports = config