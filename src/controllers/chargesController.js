
const { sendResponse } = require('../middleware/response')
const jwt_decode = require('jwt-decode');
const ChargeModel = require('../models/chargeModel')
const UtilityChargeModel = require('../models/utilityChargeModel')
const UserModel = require('../models/authModel')
const UtilityModel = require('../models/chargeModel');
const ReadingModel = require('../models/readingModel');
const { validateUser } = require('../middleware/user_Validator');



exports.getChargesByPropertyID= (req,res) => {
    const id = req.params.id

    let token = req.headers.authorization;

    token=token.slice(7)
    let decoded = jwt_decode(token)
    console.log("decoded---",decoded.email)
    let email = decoded.email
    let data = [id,email]

    UtilityModel.getchargesByAgentPropertiesChargeType(data,(err,results) =>{
      if(err)return sendResponse(res,0,"",500,"error something went wrong"+err)
      if(!results)return sendResponse(res,0,"",500,"no response")
      if(results){
        console.log("this is the one results",results)
        return sendResponse(res,1,results,200,"data")
      }
  
    })

    
}

exports.getInArraysChargesByPropertyID =  async (req,res) => {
    const id = req.params.id

    let token = req.headers.authorization;

    token=token.slice(7)
    let decoded = jwt_decode(token)
    console.log("decoded---",decoded.email)
    let data = decoded.email

   

    const testBody = {
      email: decoded.email,
      createdBy :decoded.email
    }

   await validateUser(testBody)
    .then((user) => {
          console.log("user.email",user.email)
     
  
            let role = user.user_category.split(',')[1];
      if(role==5000){
            const waterChargePromise =  ChargeModel.getChargesByType(1);
            const KPLCChargePromise =  ChargeModel.getChargesByType(2);
            const garbageChargePromise =  ChargeModel.getChargesByType(3);

            const [waterCharge, KPLCCharge, garbageCharge] =  Promise.all([
              waterChargePromise,
              KPLCChargePromise,
              garbageChargePromise
          ]);

            const results = {
                waterCharge,
                KPLCCharge,
                garbageCharge
            };
            console.log("results--->",results)

            return sendResponse(res, 1, results, 200, "data");
  
          
      }else if (role==3000){
        
  
        UtilityModel.getchargesByAgentPropertiesByEmail(user.email,(err,results) =>{
            if(err){
            console.log(err)
            return sendResponse(res,0,"",500,"con invalid"+err)
          }
          console.log("results --->",results)
          return sendResponse(res,1,results,200,"data added")
        }) 
      }  
      
    })
    .catch((error) => {
      // Handle the error
      console.log({error})
      return sendResponse(res,1,error,400,"data added"+error)
    });

    
}
exports.getALLChargesByPropertyID= (req,res) => {
    const id = req.params.id

    let token = req.headers.authorization;

    token=token.slice(7)
    let decoded = jwt_decode(token)
    console.log("decoded---",decoded.email)
    let data = decoded.email

   

    const testBody = {
      email: decoded.email,
      createdBy :decoded.email
    }

    validateUser(testBody)
    .then((user) => {
          console.log("user.email",user.email)
     
  
            let role = user.user_category.split(',')[1];
      if(role==5000){
  
  
        UtilityModel.getchargesByAgentProperties((err,results) =>{
          if(err)return sendResponse(res,0,"",500,"error something went wrong"+err)
          if(!results)return sendResponse(res,0,"",500,"no response")
          if(results){
            console.log("results are here",results)
            return sendResponse(res,1,results,200,"data")
          }
      
        })
        
  
      }else if (role==3000){
        
  
        UtilityModel.getchargesByAgentPropertiesByEmail(user.email,(err,results) =>{
            if(err){
            console.log(err)
            return sendResponse(res,0,"",500,"con invalid"+err)
          }
          console.log("results --->",results)
          return sendResponse(res,1,results,200,"data added")
        }) 
      }  
      
    })
    .catch((error) => {
      // Handle the error
      return sendResponse(res,1,results,400,"data added"+error)
    });

    
}


exports.createCharges = (req,res) => {
  let body = req.body
  //console.log("body",body)

  UserModel.getUserByUsernameExtended(body.charge_created_by,(err,results) =>{
    if(err)return sendResponse(res,0,"",500,"error something went wrong"+err)
    if(!results)return sendResponse(res,0,"",500,"no response")
    if(results){
      console.log("results",results.id)
      body = {...body, charge_created_by: 1};
      //console.log("body>>",body)
      ChargeModel.createUtilityCharge(body,(err,results) =>{
        if(err){
        console.log(err)
        return sendResponse(res,0,"",500,"Database ectionm invalid"+err)
      }
      return sendResponse(res,1,results,201,"data added")
    })

    }

  })

}
exports.createConsumptionUtility = (req,res) => {
  let body = req.body
  let token = req.headers.authorization;

  token=token.slice(7)
  let decoded = jwt_decode(token)
  
  const testBody = {
    email: decoded.email,
    createdBy :body.reading_createdBy
  }
 // ``, ``, ``, ``, `reading_prev_reading`,
 // ``, `reading_record`, ``, ``, ``, ``
//  input0 {
//   reading_propertyID: '',
//   reading_unitID: '',
//   reading_utilityTypeID: '',
//   reading_nowReading: '',
//   createdBy: '1email.jnjc@gmail.com'
// }

// body---->1 {
//   reading_propertyID: '2',
//   reading_unitID: '3',
//   reading_utilityTypeID: '5',
//   reading_nowReading: '3345',
//   createdBy: '1email.jnjc@gmail.com',
//   reading_status: 1,
//   reading_visibility: 1,
//   reading_createdBy: 1,

//   reading_date: '2023-1-30 23:50:51'
// }
//``, ``, ``, `reading_prev_reading`, ``, `reading_record`, ``, ``, ``, `` 
  
var date = new Date();
var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
var date_time = current_date+" "+current_time;

 console.log("input0",body)
  validateUser(testBody)
  .then((user) => {
   
     
      console.log("input",user)
      let searchdata = [body.reading_propertyID,body.reading_unitID,body.reading_utilityTypeID]
      ChargeModel.getConsumptionLastRecord(searchdata,(err,results) =>{
          if(err){
          console.log(err)
          return sendResponse(res,0,"",500,"con invalid"+err)
        }
        if(results[0].latest_id === null|| results[0].latest_id|| undefined || results[0].latest_id===""){
          console.log("results ->",results[0].latest_id)
          body = {...body, reading_status:1,reading_visibility:1,reading_createdBy: user.id,reading_date:date_time,reading_prev_reading:0,reading_record:body.reading_nowReading};
          console.log("body---->1",body)

        }else {
          console.log("meee")
          let reading =body.reading_nowReading-results.reading_prev_reading
          body = {...body, reading_status:1,reading_visibility:1,reading_createdBy: user.id,reading_date:date_time,reading_prev_reading:results.reading_prev_reading,reading_record:reading};
          console.log("body---->2",body)
        }

        ReadingModel.createUtilityReading(body,(err,results) =>{
                if(err){
                console.log(err)
                return sendResponse(res,0,"",500,"Database ectionm invalid"+err)
              }
              return sendResponse(res,1,results,201,"data added")
            })
       // console.log("boy to body",body)


      })
  
         
    
    
  })
  .catch((error) => {
    // Handle the error
    return sendResponse(res,1,"results",400,"data added"+JSON.stringify(error))
  });


}
