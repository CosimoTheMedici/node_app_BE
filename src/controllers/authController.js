const {genSaltSync,hashSync,compareSync} = require("bcrypt");
var generator = require('generate-password');
const UserModel = require('../models/authModel')
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const { sendEmailWithAttachment } = require("../middleware/systemMailer");
const { createPDF,generateReceipts, generatecustomReceipt } = require("../middleware/pdfCreator");
const { sendResponse } = require("../middleware/response");
require('dotenv').config();

exports.createNewUser = (email,cat)=>{
  
    // console.log('req',email)
    // console.log('req',cat)
    var password = generator.generate({
        length: 10,
        numbers: true,
        uppercase: true
    });

    let uuidV1 = uuid.v1()
    let salt = genSaltSync(10)
    let hashPassword = hashSync(password,salt);
    let payload = {
                    
                    password:hashPassword,
                    uuid:uuidV1,
                    email:email,
                    user_category:cat,
                    business_id:4,
                    status:1,
                    salt:salt,
                    cat:'agent',
                    refreshToken:""


                  }

//    console.log( compareSync(password,hashPassword))
//    console.log(payload)
            let payloadRes = {payload,password}
    return payloadRes
}

exports.loginUser = (req,res) =>{
    const body = req.body;
  
    //generateReceipt(products,1000)
    //generateReceipts()
    //generatecustomReceipt('John Smith', 1234.56);

    //createPDF2()
    //sendEmailWithAttachment("cosmasthuku4@gmail.com")
   
    UserModel.getUserByUsername(body.email,(err,results) =>{
        if(err){
            console.log(err)
        }
        if(!results){
            return res.json({
                success:0,
                data:"Invalid email  or password"
            });
        }
        const compareResults = compareSync(body.password,results.password)
        
       
        
        if(compareResults){
            results.password = undefined;
            results.refreshToken = undefined;
            results.id = undefined;
            
            const accessToken = jwt.sign(
                                    {
                                        email: results.email,
                                        status: results.status,
                                        user_category: results.user_category,
                                        uuid: results.uuid,
                                        business_id: results.business_id
                                    },
                                    process.env.ACCESS_TOKEN_SECRET,
                                    {expiresIn:"1h" }
                                );
            const refreshToken = jwt.sign(
                                    {result:results},
                                    process.env.REFRESH_TOKEN_SECRET,
                                    {expiresIn:"9h" }
                                );compareSync
                                console.log("refreshToken.length",refreshToken)
                                console.log("accessToken.length",accessToken)

                                
           UserModel.updateRefreshToken(refreshToken,results.email,(err,results) =>{
            if(err){
                console.log(err)
            }
            if(!results){
                return res.json({
                    success:0,
                    data:"something went-wrong"
                });
            }
            if(results){
               // res.cookie('jwt',refreshToken,{maxAge:24*60*60*1000});
                res.cookie('jwt',refreshToken,{httpOnly:true, sameSite:'None', secure:true,maxAge:24*60*60*1000});
                return res.json({
                    success:1,
                    message:"login successfully",
                    accessToken:accessToken,
                });
            }
           })

        } else {
            return res.json({
                success:0,
                data:"Invalid email or password"
            });
        }
    })

}

exports.createEmployeeUser = (req,res) => {
    const body = req.body
    const salt = genSaltSync(10);
    //body.password = //(body.password,salt);

    //const userReqData = new EmployeeModel(body)

    UserModel.createUser(body,(err,results) =>{
        if(err){
        console.log(err)
        return res.status(500).json({
            success:0,
            message:"Database connection invalid"
        })
      }
      return res.status(200).json({
        success:1,
        data:results,
        message:"user added"
      })
    })
}

exports.getUsersDatas = (req,res) => {
    const body = req.body
   

    UserModel.getAllUsers((err,results) =>{
        if(err){
        console.log(err)
        return res.status(500).json({
            success:0,
            message:"Database ection invalid"
        })
      }
      return res.json({
        success:1,
        data:results,
        message:"user added"
      })
    })
}

exports.testing = (req,res) => {
    return sendResponse(res,0,"",200,"server working")
}
