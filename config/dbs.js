const mysql = require('mysql2');
const configs = require('./configs');

const db1 = mysql.createConnection(configs.dbs.mysql.db1);

module.exports = {
    db1
};