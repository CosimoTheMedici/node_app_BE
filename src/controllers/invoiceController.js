


const { validateUser } = require("../middleware/user_Validator");
const jwt_decode = require('jwt-decode');
const fs = require('fs');
const InvoiceModel = require('../models/invoiceModel');
const { sendResponse } = require("../middleware/response");
const path = require("path");




  exports.fileCreatePendingInvoices =  async (req,res) => {
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

exports.createPreInvoices = async (req, res) => {
  try {
    let { body, headers } = req;
    const token = headers.authorization.slice(7);
    const decoded = jwt_decode(token);

    const testBody = {
      email: decoded.email,
      createdBy: body.reading_createdBy
    };

    //const user = await validateUser(testBody);

    

    const date = new Date();
    const current_date = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;
    const current_time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const date_time = `${current_date} ${current_time}`;

    InvoiceModel.getUnitsAndConsumptionData((error, data) => {
        if (error) {
          console.log(error)

          return sendResponse(res, 0, "", 500, "Something went wrong");
        }

        
    
        const folderPath = path.join(__dirname, 'invoiceFiles'); // You can change 'data' to your desired folder name
        const filename = path.join(`/home/cosmas/workspace/may_projectBE/rentalBooksBe/src/invoiceFiles/`, `${current_date}.json`);
        fs.writeFile(filename, JSON.stringify(data), (err) => {
          if (err) {
            console.log("err",err)
            return res.status(500).json({ error: 'Error saving data to file' });
          }
    
          // Read the data from the file
          fs.readFile(filename, 'utf8', (error, fileData) => {
            if (error) {
              return res.status(500).json({ error: 'Error reading data from file' });
            }
    
            // Send the data to the frontend
            //res.json(JSON.parse(fileData));
            return sendResponse(res,1,fileData,200,"read data")
          });
        });
      });

  //   ReadingModel.createUtilityReading(body,(err,results) =>{
  //     if(err){
  //     console.log(err)
  //     return sendResponse(res,0,"",500,"Something went wrong"+err)
  //   }
  //   return sendResponse(res,1,results,201,"data added")
  // })

    //return sendResponse(res, 1, createdReading, 201, "Data added successfully");
  } catch (error) {
    console.error("Error:", error);
    return sendResponse(res, 0, "", 500, "Something went wrong");
  }
};