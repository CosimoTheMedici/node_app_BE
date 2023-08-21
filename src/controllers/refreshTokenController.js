// const UserModel = require('../models/authModel')
// const jwt = require('jsonwebtoken')
// require('dotenv').config();


// const handleRefreshToken = (req,res) =>{
//     const cookies = req.cookies
//     if(!cookies) return res.sendStatus(401);
//     if(!cookies?.jwt) return res.sendStatus(401);
//     let refreshToken = cookies.jwt;

//     const body = req.body;
//     UserModel.getUserByRefreshToken(refreshToken,(err,results) =>{
//         if(err){
//             console.log(err)
//         }
//         if(!results){
//             return res.json({
//                 status:403,
//                 data:"forbidden"
//             });
//         }
//         if(results){
//             console.log("results",results)
//             console.log("refreshToken",refreshToken)
//             jwt.verify(
//                 refreshToken,
//                 process.env.REFRESH_TOKEN_SECRET,
//                 (err,decoded) => {
//                     console.log("decodedrh",decoded)
//                     console.log("err",err)
//                     //handle error heree
//                     let{result}=decoded
//                     console.log("results.email",results.email)
//                     if(err||result.email !== results.email )return res.sendStatus(403);
//                     const accessToken = jwt.sign(
//                         {
//                             "email":result.email,
//                             "status":result.status,
//                             "user_category":result.user_category,
//                             "uuid":result.uuid,
//                             "business_id":result.business_id

//                         },
//                         process.env.ACCESS_TOKEN_SECRET,
//                         {expiresIn:'1hr'}
//                     );
//                     res.json({accessToken})
//                 })
               
//         } 
//     })

// }
// module.exports = {handleRefreshToken}


const UserModel = require('../models/authModel');
const jwt = require('jsonwebtoken');
const { getUserByRefreshToken } = require('../models/authModel');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  //console.log("cookies milk",req)
  //console.log("cookies--",cookies)
  if (!cookies || !cookies.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  // const user = await getUserByRefreshToken(refreshToken).exec();
  // console.log("main refreshToken",user)

  try {
    //const user = await UserModel.getUserByRefreshToken(refreshToken);
    //console.log("main refreshToken",user)
    let user = await getUserByRefreshToken(refreshToken);
    // console.log("main refreshToken")
     //console.log("main refreshToken",user)
    if (!user) return res.status(403).json({ status: 403, data: "Forbidkkklllden" });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        //console.log("decoded",decoded.email)
        //console.log("decoded",user[0].email)
        //console.log("decoded",user?.email)
        if (err || decoded.result.email !== user[0].email)return res.sendStatus(402);
        user=user[0]
        const accessToken = jwt.sign(
          {
            email: user.email,
            status: user.status,
            user_category: user.user_category,
            uuid: user.uuid,
            business_id: user.business_id
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1hr' }
        );
        //console.log(" this is your accessToken", accessToken)
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};


module.exports = { handleRefreshToken };
