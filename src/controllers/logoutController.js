const UserModel = require('../models/authModel')
const jwt = require('jsonwebtoken')


const handleLogoutRequest = (req,res) =>{
    //on client also delete the accessToken
    const cookies = req.cookies
    if(!cookies?.jwt) return res.status(204);//np content

    let refreshToken = cookies.jwt;
    console.log("refreshToken",refreshToken)
   

    UserModel.getUserByRefreshToken1(refreshToken,(err,results) =>{
        console.log("results++++",results)
        if(err){
            console.log("here1")
            console.log(err)
        }
        if(!results){
            console.log("here2")
            res.clearCookie('jwt',{httpOnly:true, sameSite:'None', secure:true})
            return res.json({
                status:204,
                data:"no content"
            });
        }
        if(results){
            console.log("here3")
            let refreshtoken=" "
            UserModel.updateRefreshToken(refreshtoken,results.email,(err,results) =>{
                if(err){
                    console.log(err)
                }
                if(!results){
                    return res.json({
                        success:0,
                        data:"something went wrong"
                    });
                }
                if(results){
                    console.log("here4")
                    res.clearCookie('jwt',{httpOnly:true, sameSite:'None', secure:true})
                    return res.json({
                        success:1,
                        status:204,
                        message:"No Content",
                    });
                }
               })
            
        } 
    })

}
module.exports = {handleLogoutRequest}