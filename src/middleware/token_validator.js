const { verify } =  require("jsonwebtoken")
require('dotenv').config();

// exports.validateToken = (req,res,next) => {
//    // let token = req.get("authorization");
//     let token = req.headers.authorization || req.headers.Authorization;
//    // let token = req.getHeader("authorization");
//     console.log("token-0-",req.headers)
//     if(token){
//         token = token.slice(7);
//         console.log('token',token)
//         const crypt_key = process.env.ACCESS_TOKEN_SECRET
//         verify(token,crypt_key,(err,decoded) =>{
//             //console.log(crypt_key)
//             if(err){
//                 res.json({
//                     success:0,
//                     status:403,
//                     message:"Forbiddenn"
//                 });
//             } else {
//                 let {email,user_category}=decoded
//                 console.log("decoded",decoded)
//                 req.user = email;
//                 req.roles = user_category.split(",");
//                 next();
//             }
//         })
//     } else {
//         res.json({
//             success: 0,
//             status:401,
//             message: "Access denied! unauthorized user"
//         });
//     }

// }


// const jwt = require('jsonwebtoken');

// function validateToken(req, res, next) {
//     const token = req.headers.authorization;
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Invalid Token' });
//     }
// }

// module.exports = validateToken;




exports.validateToken = (req, res, next) => {
    const token = req.headers.authorization;
     //console.log("ppp",token)
    if (!token) {
      return res.status(401).json({
        success: 0,
        message: "Access denied! unauthorized user--",token
      });
    }
  
    const cryptKey = process.env.ACCESS_TOKEN_SECRET;
    verify(token.slice(7), cryptKey, (err, decoded) => {
      if (err) {
        //console.log("err",err)
        return res.status(403).json({
          success: 0,
          message: "Forbiddenn3"
        });
      }
      //console.log("decoded",decoded)
      //console.log("decoded.result",decoded.result)
      // console.log("ecoded.result.user_category",decoded?.user_category)
      // console.log("decoded.user_category",decoded?.user_category)
  
      req.user  = decoded?.email || decoded.result?.email;
      req.roles = decoded?.user_category.split(",") || decoded.result?.user_category.split(",");
      next();
    });
  };