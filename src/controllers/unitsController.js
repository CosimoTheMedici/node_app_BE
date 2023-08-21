const { sendResponse } = require('../middleware/response')
const jwt_decode = require('jwt-decode');
const UnitModel = require('../models/unitModel');
const { validateUser } = require('../middleware/user_Validator');



exports.getMyAssignedUnits = (req,res) => {
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
      console.log("user",role)
      if(role==5000){

        UnitModel.getAllVisibleUnits(user.email,(err,results) =>{
          console.log("results1")
          console.log("results",results)
          if(err){
          console.log(err)
          return sendResponse(res,0,"",500,"Database ectionm invalid"+err)
        }
        
        return sendResponse(res,1,results,200,"data")
   
      })
        

      }else if (role==3000){
        
        UnitModel.getAgentUnitsByAgentEmail(user.email,(err,results) =>{
          // console.log("results1")
           console.log("results-->",results)
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
exports.getUnitsByPropertyID = (req,res) => {
    const id = req.params.id
   

    UnitModel.getAllUnitsByPropertyID(id,(err,results) =>{
        console.log("results1")
        console.log("results",results)
        if(err){
        console.log(err)
        return sendResponse(res,0,"",500,"Database ectionm invalid"+err)
      }
      return sendResponse(res,1,results,200,"data")
 
    })

    
}
exports.getVacantUnitsByPropertyID = (req,res) => {
    const id = req.params.id
    console.log("param",id)
   

    UnitModel.getAllVacantUnitsByPropertyID(id,(err,results) =>{
        console.log("results1")
        console.log("results",results)
        if(err){
        console.log(err)
        return sendResponse(res,0,"",500,"Database ectionm invalid"+err)
      }
      return sendResponse(res,1,results,200,"data")
 
    })

    
}


exports.getAgentPropertiesData = (req,res) => {
  let token = req.headers.authorization;

  token=token.slice(7)
  let decoded = jwt_decode(token)
 

  UnitModel.getAgentUnitsByAgentEmail(decoded.email,(err,results) =>{
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
exports.createUnits = (req,res) => {

  let body = req.body
  let token = req.headers.authorization;
  console.log("input",body)
  token=token.slice(7)
  let decoded = jwt_decode(token)
  
  const testBody = {
    email: decoded.email,
    createdBy :body.unit_createdBy
  }

  validateUser(testBody)
  .then((user) => {
      body = {...body ,unit_createdBy: user.id,unit_occupancy:2,unit_status:1};
      UnitModel.createUnit(body,(err,results) =>{
          if(err){
          console.log(err)
          return sendResponse(res,0,"",500,"con invalid"+err)
        }
        return sendResponse(res,1,results,201,"data added")
      })
  
         
    
    
  })
  .catch((error) => {
    // Handle the error
    return sendResponse(res,1,results,400,"data added"+error)
  });
}