var dbConn = require('../configs/db.config')

var User = function (user) {
    
    this.password       =   user.password;
    this.uuid           =   user.uuid;
    this.email          =   user.email;
    this.user_category  =   user.user_category;
    this.business_id    =   user.business_id;
    this.status         =   user.status;
}

User.createUser = (data,callBack) => {
    dbConn.query('INSERT INTO app_users SET ?',
    [data],
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}
User.getUserByUsername = (username, callBack )=>{
    dbConn.query('SELECT * FROM app_users WHERE email=?',
    [username],
    (error,results,fields)=>{
        if(error){
            callBack(error)
        }
        return callBack(null,results[0]);
    })
}

User.getUserByUsernameExtended = (username, callBack )=>{
    dbConn.query('SELECT `id`, `uuid`, `email`, `user_category`, `business_id`, `status`, `refreshToken` FROM app_users WHERE email=?',
    [username],
    (error,results,fields)=>{
        if(error){
            callBack(error)
        }
        return callBack(null,results[0]);
    })
}
// User.getUserByRefreshToken1 = (refreshToken, callBack )=>{
//     dbConn.query('SELECT * FROM app_users WHERE refreshToken=?',
//     [refreshToken],
//     (error,results,fields)=>{
//         if(error){
//             callBack(error)
//         }
//         return callBack(null,results);
//     })
// }
 User.getUserByRefreshToken1 = async (refreshToken, callback) => {
    dbConn.query('SELECT * FROM app_users WHERE refreshToken = ?', [refreshToken], (error, results) => {
        
        if (error) {
            return callback(error);
        }
        if (results.length > 0) {
            console.log("results.RowDataPacket",results.length)
            return callback(results[0]);
        } else {
            return callback(null, null);
        }
       
    });
}
User.getUserByRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        dbConn.query('SELECT * FROM app_users WHERE refreshToken=?', [refreshToken], (error, results) => {
           
            if (error) {
                reject(error);
            }
            if (results && results.length > 0) {
                resolve(results);
            } else {
                resolve(null);
            }
        });
    });
}

User.updateRefreshToken = (token,email, callBack )=>{
    dbConn.query('UPDATE app_users SET refreshToken= ? WHERE email = ?',
    [token,email],
    (error,results,fields)=>{
        if(error){
            callBack(error)
        }
        return callBack(null,results);
    })
}

User.getAllUsers = (callBack )=>{
    dbConn.query('SELECT * FROM app_users',
    (error,results,fields)=>{
        if(error){
            callBack(error)
        }
        return callBack(null,results);
    })
}


module.exports = User;