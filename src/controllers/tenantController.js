const jwt_decode = require('jwt-decode');
const { sendResponse } = require('../middleware/response');
const { validateUser } = require('../middleware/user_Validator');
const UnitModel = require('../models/unitModel')
const TenantModel = require('../models/tenantModel')



exports.getTenantsByPropertyID = (req,res) => {

   const id = req.params.id
  let body = req.body
  let token = req.headers.authorization;
  //console.log("input",body)
  token=token.slice(7)
  let decoded = jwt_decode(token)
  
  const testBody = {
    email: decoded.email,
    createdBy :decoded.email
  }
 
  validateUser(testBody)
  .then((user) => {
    
    let role = user.user_category.split(',')[1];
    //console.log("user",role)
    if(role==5000){


      TenantModel.getAllTenantByAgentOwner((err,results) =>{
        // console.log("results1")
         console.log("results",results)
        if(err){
        console.log(err)
        return sendResponse(res,0,"",500,"Database ectionm invalid"+err)
      }
      return sendResponse(res,1,results,200,"data")
 
    })
      

    }else if (role==3000){
      

      TenantModel.getAllTenantByPropertyID(user.email,(err,results) =>{
      console.log("results-----+",results)
        if(err){
        console.log(err)
        return sendResponse(res,0,"",500,"Database ectionm invalid"+err)
      }
      return sendResponse(res,1,results,200,"data")
 
    })
    }      
  })
  .catch((error) => {
    // Handle the error
    return sendResponse(res,1,results,400,"data added"+error)
  });
   



}

exports.createTenants = (req,res) => {
    let body = req.body
    let token = req.headers.authorization;

    token=token.slice(7)
    let decoded = jwt_decode(token)
    
    const testBody = {
      email: decoded.email,
      createdBy :body.createdBy
    }


    validateUser(testBody)
    .then((user) => {
        body = {...body, createdBy: user.id};
          TenantModel.createTenant(body,(err,results) =>{
            if(err){
            console.log(err)
            return sendResponse(res,0,"",500,"con invalid"+err)
          }
            UnitModel.updateUnitOccupancy(body.unitName,(err,results) =>{
              if(err){
              console.log(err)
              return sendResponse(res,0,"",500,"con invalid"+err)
            }
            return sendResponse(res,1,results,201,"data added")
          })
          
        })
    
           
      
      
    })
    .catch((error) => {
      // Handle the error
      return sendResponse(res,1,results,400,"data added"+error)
    });
     
  
  }

  