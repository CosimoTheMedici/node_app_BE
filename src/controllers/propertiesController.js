const { sendResponse } = require('../middleware/response');
const { validateUser } = require('../middleware/user_Validator');
const PropertyModel = require('../models/propertiesModel')
const NewPropertyModel = require('../models/propertiesAsyncModel')
const jwt_decode = require('jwt-decode');

exports.getPropertyData = (req,res) => {
    const body = req.body
   

    PropertyModel.getAllProperties((err,results) =>{
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

exports.getAgentPropertiesData = (req,res) => {
    let token = req.headers.authorization;

    token=token.slice(7)
    let decoded = jwt_decode(token)
   

    PropertyModel.getAgentPropertiesByID(decoded.email,(err,results) =>{
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


exports.get_My_Properties = (req,res) => {
  
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
    
      NewPropertyModel.getAllProperties(user.email,(err,results) =>{
        
        if(err){
        console.log(err)
        return sendResponse(res,0,"",500,"Database ectionm invalid"+err)
      }
      
      return sendResponse(res,1,results,200,"data")
 
    })
      

    }else if (role==3000){
      
      NewPropertyModel.getPropertiesByEmail(user.email,(err,results) =>{
        // console.log("results1")
         console.log("results-properties->",results)
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

exports.getMyProperties = (req,res) => {
  let body = req.body
  let token = req.headers.authorization;

  token=token.slice(7)
  let decoded = jwt_decode(token)
  
  const testBody = {
    email: decoded.email,
    createdBy :decoded.email
  }


  validateUser(testBody)
  .then((user) => {
        console.log("user.email",user.email)
   

          let role = user.user_category.split(',')[1];
    console.log("user",role)
    if(role==5000){


      PropertyModel.getAgentPropertiesByID((err,results) =>{
        if(err){
        console.log(err)
        return sendResponse(res,0,"",500,"con invalid"+err)
      }
      console.log("results --->",results)
      return sendResponse(res,1,results,200,"data added")
    }) 
      

    }else if (role==3000){
      

     PropertyModel.getAgentPropertiesByEmail(user.email,(err,results) =>{
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

exports.createProperties = (req,res) => {
  const body = req.body
 

  PropertyModel.createProperty1(body,(err,results) =>{
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

exports.createProperties = (req,res) => {

  let body = req.body
  let token = req.headers.authorization;
  console.log("input",body)
  token=token.slice(7)
  let decoded = jwt_decode(token)
  
  const testBody = {
    email: decoded.email,
    createdBy :body.createdBy
  }

  validateUser(testBody)
  .then((user) => {
      delete body.createdBy;
      body = {...body ,property_owner: user.id};
      PropertyModel.createProperty(body,(err,results) =>{
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

// const logger = require('winston'); // import a logging library

// exports.createProperties = (req, res) => {
//   try {
//     // validate the input data
//     if (!req.body.propertyName || !req.body.propertyLocation) {
//       return res.status(400).json({
//         success: 0,
//         message: 'propertyName and propertyLocation are required fields'
//       });
//     }

//     PropertyModel.createProperty(req.body, (err, results) => {
//       if (err) {
//         logger.error(`Error while creating property: ${err.message}`, { stack: err.stack });
//         return res.status(500).json({
//           success: 0,
//           message: 'Error while creating property'
//         });x/.
//       }
//       return res.status(200).json({
//         success: 1,
//         data: results,
//         message: 'property added'
//       });
//     });
//   } catch (err) {
//     logger.error(`Error while creating property: ${err.message}`, { stack: err.stack });
//     return res.status(500).json({
//       success: 0,
//       message: 'Error while creating property'
//     });
//   }
// };



// app.post('/properties', (req, res) => {
//   try {
//     // validation
//     PropertyModel.createProperty(req.body, (err, results) => {
//       if (err) {
//         return sendResponse(res, false, null, "Error while creating property")
//       }
//       return sendResponse(res, true, results, "property added")
//     });
//   } catch (err) {
//     return sendResponse(res, false, null, "Error while creating property")
//   }
// });


// const sendResponse = (res, success, data, message) => {
//   return res.status(success ? 200 : 500).json({
//     success: success ? 1 : 0,
//     data: data,
//     message: message
//   });
// }
