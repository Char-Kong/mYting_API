const mysql = require('mysql');

const mysqlConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_db'
});

mysqlConnect.connect((error) =>{
    // mysqlConnect.query('CREATE DATABASE express_db', (err, result) => {
    //     if(err){
    //         console.log('DB 생성 실패');
    //     }
    //     else{
    //         console.log('DB 생성 성공');
    //     }
    // });
    if(error){
        console.log('DB 연걸 실패');
    }
    else{
        console.log('DB 연걸 성공');
    }

    const sql = 'select * from '
});

module.exports = mysqlConnect;