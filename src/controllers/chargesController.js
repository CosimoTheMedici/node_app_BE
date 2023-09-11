
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
exports.getAllConsumptionUtility= (req,res) => {
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
  
  
        ReadingModel.getALLUtilityReadings((err,results) =>{
          if(err)return sendResponse(res,0,"",500,"error something went wrong"+err)
          if(!results)return sendResponse(res,0,"",500,"no response")
          if(results){
            console.log("results are here",results)
            return sendResponse(res,1,results,200,"data")
          }
      
        })
        
  
      }else if (role==3000){
        
  
        ReadingModel.getALLUtilityReadings(user.email,(err,results) =>{
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
exports.createConsumptionUtility1 = (req,res) => {
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

exports.createConsumptionUtility = async (req, res) => {
  try {
    let { body, headers } = req;
    const token = headers.authorization.slice(7);
    const decoded = jwt_decode(token);

    const testBody = {
      email: decoded.email,
      createdBy: body.reading_createdBy
    };

    const user = await validateUser(testBody);

    const date = new Date();
    const current_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const current_time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const date_time = `${current_date} ${current_time}`;

    const {reading_unitID} = body

    const searchdata = [body.reading_propertyID, body.reading_unitID, body.reading_utilityTypeID];
    let utilityType
    if(body.reading_utilityTypeID && body.reading_utilityTypeID == 1)utilityType="unit_water_charge"
    if(body.reading_utilityTypeID && body.reading_utilityTypeID == 2)utilityType="unit_kplc_charge"
    if(body.reading_utilityTypeID && body.reading_utilityTypeID == 3)utilityType="unit_garbage_charge"

    const resultsl = await ChargeModel.getUnitUtilityFees(utilityType,reading_unitID);
    const {charge_per_unit}= resultsl[0]
   
    const results = await ChargeModel.getConsumptionLastRecord(searchdata);
 console.log("results-  --->",results)
 
 
    if (!results || !results[0] || results[0].latest_id === null || results[0].latest_id === undefined || results[0].latest_id === "") {
      console.log("results ->", results[0].latest_id);
      body = {
        ...body,
        reading_status: 1,
        reading_visibility: 1,
        reading_createdBy: user.id,
        reading_date: date_time,
        reading_prev_reading: 0,
        reading_record: body.reading_nowReading,
        reading_payment_status: 2,
        reading_amount:charge_per_unit * body.reading_nowReading
      };
      console.log("body---->1", body);
    } else {
      console.log("meee");
      const reading = body.reading_nowReading - results[0].reading_prev_reading;
      console.log("reading*charge_per_unit",reading,charge_per_unit)
      body = {
        ...body,
        reading_status: 1,
        reading_visibility: 1,
        reading_createdBy: user.id,
        reading_date: date_time,
        reading_prev_reading: results[0].reading_nowReading,
        reading_record: reading,
        reading_payment_status: 2,
        reading_amount:charge_per_unit * reading
      };
      console.log("body---->2", body);
    }

  //   //const createdReading = await ReadingModel.createUtilityReading(body);

    ReadingModel.createUtilityReading(body,(err,results) =>{
      if(err){
      console.log(err)
      return sendResponse(res,0,"",500,"Something went wrong"+err)
    }
    return sendResponse(res,1,results,201,"data added")
  })

    //return sendResponse(res, 1, createdReading, 201, "Data added successfully");
  } catch (error) {
    console.error("Error:", error);
    return sendResponse(res, 0, "", 500, "Something went wrong");
  }
};

exports.createCharges1 = async (req, res) => {
  try {
    const body = req.body;
    const { charge_created_by } = body;

    // Assuming getUserByUsernameExtended returns a Promise
    const user = await UserModel.getUserByUsernameExtended(charge_created_by);

    if (!user) {
      return sendResponse(res, 0, '', 500, 'No user found');
    }

    const chargeData = {
      ...body,
      charge_created_by: user.id,
    };

    const createdCharge = await ChargeModel.createUtilityCharge(chargeData);

    return sendResponse(res, 1, createdCharge, 201, 'Data added successfully');
  } catch (error) {
    console.error('Error:', error);
    return sendResponse(res, 0, '', 500, 'Something went wrong');
  }
};
