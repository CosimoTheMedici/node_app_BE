const jwt_decode = require('jwt-decode');
const { sendResponse } = require('../middleware/response');
const { validateUser } = require('../middleware/user_Validator');
const ChargeModel = require('../models/chargeModel')
const AgentModel = require('../models/agentModel')
const PropertiesModel = require('../models/propertiesModel')
const UserModel = require('../models/authModel');
const { createNewUser } = require('./authController');
const { sendEmailWithAttachment } = require('../middleware/systemMailer');



exports.getAgentsByOwnerID1 = (req,res) => {
    const id = req.params.id
    let token = req.headers.authorization;

    token=token.slice(7)
    let decoded = jwt_decode(token)
    console.log("decoded---",decoded.email)
    //    //get utility charges by email and charge type
    let data = {'email':decoded.email,'charge_type':id}
    ChargeModel.getchargesByAgentProperties(data,(err,results) =>{
        if(err)return sendResponse(res,0,"",500,"error something went wrong"+err)
        if(!results)return sendResponse(res,0,"",500,"no response")
        if(results){
          console.log("results",results)
          //console.log("body>>",body)

        //   AgentModel.getAgentsByOwnerId(results.id,(err,results) =>{
        //         // console.log("results1")
        //         // console.log("results",results)
        //         if(err){
        //         console.log(err)
        //         return sendResponse(res,0,"",500,"Database ectionm invalid"+err)
        //       }
        //       return sendResponse(res,1,results,200,"data")
        
        //     })
      
    
        }
    
      })
   

   

    
}
exports.getAgentsByOwnerID = (req,res) => {
    //const id = req.params.id
    let token = req.headers.authorization;

    token=token.slice(7)
    let decoded = jwt_decode(token)
    console.log("decoded---",decoded.email)
    //    //get utility charges by email and charge type
    //let data = {'email':decoded.email,'charge_type':id}
    AgentModel.getAgentsByOwnerId(decoded.email,(err,results) =>{
        if(err)return sendResponse(res,0,"",500,"error something went wrong"+err)
        if(!results)return sendResponse(res,0,"",500,"no response")
        if(results){
          // console.log("results",results)
          return sendResponse(res,1,results,200,"data")

        }
    
      })
   

   

    
}

exports.createAgents =  (req,res) => {
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
        body = {...body, agent_properties:[0],agent_status:1,agent_visibility:1,createdBy: user.id,is_User:2};
        console.log("input",body)
        AgentModel.createAgent(body,(err,results) =>{
            if(err){
            console.log(err)
            return sendResponse(res,0,"",500,"con invalid"+err)
          }
          let payloadres = createNewUser(body.agent_email,'2001,3000')
          //console.log("payloadres",payloadres)
          AgentModel.createUser(payloadres.payload, async (err,results) =>{
            if(err){
              console.log(err)
              return sendResponse(res,0,"",500,"con invalid"+err)
            }

              let sendemailres= sendEmailWithAttachment(payloadres.payload.email,payloadres.password,"Login Credentials");
              //let sendemailres= sendEmailWithAttachment("cosmasthuku4@gmail.com");
              return sendResponse(res,1,results,201,"data added")        
           
          })
        })
    
           
      
      
    })
    .catch((error) => {
      // Handle the error
      return sendResponse(res,1,results,400,"data added"+error)
    });
   
  }

exports.assignAgents = (req,res) => {
    let body = req.body
    let token = req.headers.authorization;

    token=token.slice(7)
    let decoded = jwt_decode(token)
    
    console.log("body to",body)
    AgentModel.getAgentsById(body.agentName,(err,results) =>{
        if(err)return sendResponse(res,0,"",500,"error something went wrong"+err)
        if(!results)return sendResponse(res,0,"",500,"no response")
        if(results){
            let results1 = results//.agent_properties
            PropertiesModel.getPropertyByID(body.propertyName,(err,results) =>{
                if(err)return sendResponse(res,0,"",500,"error something went wrong"+err)
                if(!results)return sendResponse(res,0,"",500,"no response")
                if(results){
                   
                    let property_agent = results[0].property_agent
                    let agent_properties =results1[0].agent_properties

                        agent_properties = agent_properties+","+body.propertyName

                        property_agent =property_agent+","+body.agentName

                      PropertiesModel.updatePropertyAgentsByID(property_agent,body.propertyName,(err,results) =>{
                        if(err)return sendResponse(res,0,"",500,"error something went wrong"+err)
                        if(!results)return sendResponse(res,0,"",500,"no response")
                        if(results){

                            AgentModel.updateAgentspropertiesById(agent_properties,body.agentName,(err,results) =>{
                                if(err)return sendResponse(res,0,"",500,"error something went wrong"+err)
                                if(!results)return sendResponse(res,0,"",500,"no response")
                                if(results) return sendResponse(res,1,results,201,"data added")
                                console.log("added")
                         })
                
                        }
                    
                      })

        
                }
            
              })

        }
    
      })

   
  }

  