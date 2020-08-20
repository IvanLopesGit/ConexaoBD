const mySql = require('mysql');

const pool = mySql.createPool({
    "user": "root",
    "password": "sua senha",
    "database": "seu BD",
    "host": "localhost",
    "port": 3306
});

exports.pool = pool;