const jwt_decode = require('jwt-decode');
const { sendResponse } = require('../middleware/response');
const { validateUser } = require('../middleware/user_Validator');
const UnitModel = require('../models/unitModel')
const UserModel = require('../models/authModel')
const PaymentModel = require('../models/paymentModel')



exports.getPayments = (req,res) => {
    let token = req.headers.authorization;

    token=token.slice(7)
    let decoded = jwt_decode(token)

    UserModel.getUserByUsernameExtended(decoded.email,(err,results) =>{
      if(err)return sendResponse(res,0,"",500,"error something went wrong"+err)
      if(!results)return sendResponse(res,0,"",500,"no response")
      if(results){
        console.log("results",results.id)
        //console.log("body>>",body)

        PaymentModel.getPaymentByCreatedID(results.id,(err,results) =>{
        console.log("results1")
        console.log("results",results)
        if(err){
        console.log(err)
        return sendResponse(res,0,"",500,"Database ectionm invalid"+err)
      }
      return sendResponse(res,1,results,200,"data")
 
    })
    
  
      }
  
    })


    
}

exports.createPayments = (req,res) => {
    let body = req.body
    let token = req.headers.authorization;

    token=token.slice(7)
    let decoded = jwt_decode(token)
    
    const testBody = {
      email: decoded.email,
      createdBy :body.createdBy
    }
    console.log("body",body)

    validateUser(testBody)
    .then((user) => {
        body = {...body, createdBy: user.id,payment_date:'2023-01-27 20:43:35',payment_status:1,payment_visibility:1};
       
        PaymentModel.createPayment(body,(err,results) =>{
            if(err){
            console.log(err)
            return sendResponse(res,0,"",500,"con invalid"+err)
          }
          console.log("+")
          return sendResponse(res,1,results,201,"data added")
        })
    
           
      
      
    })
    .catch((error) => {
      // Handle the error
      return sendResponse(res,1,results,400,"User Error"+error)
    });
   
    
  
   
  
  }
// payment_amount: 1000
// payment_date: "2023-01-27T17:43:35.000Z"
// payment_id: 1
// payment_method: "mpesa"
// payment_propertyName: 1
// payment_reference_no: "ddsdeedededde"
// payment_status: "unverified"
// payment_unitName: 1
// property_Name: "kwa janeti"
// unit_name: "w12"

// ``,
//  `transaction_propertyID`, 
//  `transaction_unitID`, 
//  `transaction_openingBal`, <----
//  `transaction_rentAmount`, 
//  `transaction_waterCharge`,<----
//   `transaction_garbageCharge`, 
//   `transaction_powerCharge`, 
//   `transaction_otherCharge`, 
//   `transaction_payment`, 
//   `transaction_balance`,
//   `transaction_closingBal`, 
//   `transaction_visibility`

// createdBy: 1
// payment_amount: 1000
// payment_date: "2023-01-27T17:43:35.000Z"
// payment_id: 1
// payment_method: "mpesa"
// payment_propertyName: 1
// payment_reference_no: "ddsdeedededde"
// payment_status: 1
// payment_unitName: 1
// payment_visibility: 1
// property_Name: "kwa janeti"
// property_agent: "1,2"
// property_county: "kiambu"
// property_garbage_charge: 0
// property_id: 1
// property_images: "image.jpg"
// property_kplc_charge: 2
// property_owner: "janet"
// property_town: "kimbo"
// property_units: 45
// property_water_charge: 1
// unit_description: "big desc"
// unit_garbage_charge: 1
// unit_id: 1
// unit_kplc_charge: 1
// unit_name: "w12"
// unit_occupancy: 1
// unit_property_id: 1
// unit_rent_Amount: 0
// unit_status: 1
// unit_type: 2
// unit_water_charge: 1
exports.verifyPayment = (req,res) => {
    let body = req.body
    let token = req.headers.authorization;

    token=token.slice(7)
    let decoded = jwt_decode(token)
    
    const testBody = {
      email: decoded.email,
      createdBy :body.createdBy
    }
    console.log("body",body)

    let searchdata = [body.payment_id,body.unit_id]
    PaymentModel.getPaymentLastRecord(searchdata,(err,results) =>{
          if(err){
          console.log(err)
          return sendResponse(res,0,"",500,"con invalid"+err)
        }
          if(results){
          console.log("results",results)
        }


      })

    //getConsumptionLastRecord

    // validateUser(testBody)
    // .then((user) => {
    //     body = {...body, createdBy: user.id,payment_date:'2023-01-27 20:43:35',payment_status:1,payment_visibility:1};
       
    //     PaymentModel.createPayment(body,(err,results) =>{ 
    //         if(err){
    //         console.log(err)
    //         return sendResponse(res,0,"",500,"con invalid"+err)
    //       }
    //       console.log("+")
    //       return sendResponse(res,1,results,201,"data added")
    //     })
    
           
      
      
    // })
    // .catch((error) => {
    //   // Handle the error
    //   return sendResponse(res,1,results,400,"User Error"+error)
    // });
   
    
  
   
  
  }

  