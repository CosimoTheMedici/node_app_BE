const jwt_decode = require('jwt-decode')
const { sendResponse } = require('../middleware/response');
const { validateUser } = require('../middleware/user_Validator');
const UnitModel = require('../models/unitModel')
const ReadingModel = require('../models/readingModel')
const AgentModel = require('../models/agentModel')
const ChargeModel = require('../models/chargeModel')
const TransactionModel = require('../models/transactionModel');
const { currentDateTime } = require('../middleware/dateTimeHandler');

const getUtilityData1 = async (data,res) => {
  try {
    let unitData = await UnitModel.getUnitDataBypropIDunitID(data);
    if (!unitData) return sendResponse(res, 0, "", 500, "no response");

    let combinedResults = { unitData };
    for (let i = 1; i <= 3; i++) {
      data = [ ...data,i ];
      results = await ChargeModel.getutilityChargesData(data);
      combinedResults[i] = results;
      return combinedResults
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, 0, "", 500, "error something went wrong" + err);
  }
};


exports.getPaymentCompilationData1 = (req,res) => {
     let body = req.body
     const property = req.params.property
     const unit = req.params.unit

     console.log("--->",property,"-->",unit)
     let data = [property,unit]

//get unit data
let rep = getUtilityData(data,res);
  return sendResponse(res, 1, rep, 200, "data");


    
}
const getUtilityData = async (data, res) => {
  try {
    const unitData = await UnitModel.getUnitDataBypropIDunitID(data);
    if (!unitData) {
      return sendResponse(res, 0, "", 500, "No data found");
    }

    const combinedResults = { unitData };
    for (let i = 1; i <= 3; i++) {
      const results = await ChargeModel.getutilityChargesData([...data, i]);
      combinedResults[i] = results;
    }
    return sendResponse(res, 1, combinedResults, 200, "Data retrieved successfully");
  } catch (error) {
    console.error(error);
    return sendResponse(res, 0, "", 500, "An error occurred: " + error);
  }
};

exports.getPaymentCompilationData =  async(req, res) => {
  try {
    const property = req.params.property;
    const unit = req.params.unit;

    const data = [property, unit];
    const data2 = [property, unit,property, unit];
   
    const unitData =  await UnitModel.getUnitDataBypropIDunitID(data);
    console.log("unitData:--->");
    //console.log("unitData:", unitData);

    if (!unitData) {
      return sendResponse(res, 0, "", 500, "No data found");
    }
    const readingData =  await ReadingModel.getUnitDataBypropIDunitID(data);
    console.log("unitData:--->");
    //console.log("unitData: ", unitData);

    if (!readingData) {
      return sendResponse(res, 0, "", 500, "No data found");
    }
    const transactionData =  await TransactionModel.getLastTranDataBypropIDunitID(data2);
    console.log("transactinData: ", transactionData);

    if (!transactionData) {
      return sendResponse(res, 0, "", 500, "No data found");
    }
    
    const combinedResults = { unitData,readingData,transactionData };
    //console.log("here")
    for (let i = 1; i <= 3; i++) {
      const results = await ChargeModel.getutilityChargesData([property, i]);
      //console.log("data array results",results)
      combinedResults[i] = results;
    }
    console.log("data array",combinedResults)
   return sendResponse(res, 1, combinedResults, 200, "Data retrieved successfully");
  } catch (error) {
    console.error("----->",{error});
    return sendResponse(res, 0, "", 500, "An error occurred: " + error);
  }
};
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





exports.createTransaction = (req,res) => {
    let body = req.body
    let token = req.headers.authorization;

    token=token.slice(7)
    let decoded = jwt_decode(token)
    
    const testBody = {
      email: decoded.email,
      createdBy :body.transaction_createdBy
    }
    validateUser(testBody)
    .then((user) => {
        body = {...body, transaction_date:currentDateTime(),transaction_createdBy: user.id};
        //console.log("input body",body)
        TransactionModel.createPayment(body,(err,results) =>{
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

  