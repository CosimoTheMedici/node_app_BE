// static async getPreInvoiceData(req, res) {
//     try {
//       const products = ProductModel.getAllPreInvoiceDetails();



//       // Convert the products array to a string
//       const productsText = JSON.stringify(products, null, 2);

//       // Write the string to a text file
//       fs.writeFileSync('products.txt', productsText);

//       return res.status(200).send('Products data saved to products.txt');
//     } catch (error) {
//       console.error(error);
//       return res.status(500).send('Error saving products data');
//     }
//   }



const { validateUser } = require("../middleware/user_Validator");
const jwt_decode = require('jwt-decode');


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