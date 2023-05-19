require('dotenv').config();

module.exports = {
    dbs: {
        mysql: {
            db1: {
                host: process.env.DB_MYSQL_DB1_HOST || "localhost",
                user: process.env.DB_MYSQL_DB1_USER || "root",
                password: process.env.DB_MYSQL_DB1_PASSWORD || "",
                database: process.env.DB_MYSQL_DB1_DATABASE || "test",
                namedPlaceholders: true
            }
        }
    }
}