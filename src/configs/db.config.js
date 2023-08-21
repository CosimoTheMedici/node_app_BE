var mysql = require('mysql')


const dbConn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:"capital_hustle_housing_DB"
    // host:'sql300.epizy.com',
    // user:'epiz_32991948',   bwmb4oosy
    // password:"yiQRWCjCLOEHR5",   tt3I770Fd^Tl^^Q
    // database:"epiz_32991948_panelBeater"   excsn95r5

    // host: 'db4free.net',
    // port: 3306,
    // user: 'bwmb4oosy',
    // password: 'tt3I770Fd^Tl^^Q',
    // database: 'excsn95r5'
})
dbConn.connect(function(error){
    if(error)  console.log("connection error",error,{error});
    console.log('Databse Connected Successfully');
})

module.exports = dbConn
//module.exports = dbConn
//exports.default = dbConn;\