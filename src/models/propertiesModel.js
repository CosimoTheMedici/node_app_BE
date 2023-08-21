
var dbConn = require('../configs/db.config')

var Property = function (property) {
    this.property_id                  =   property.property_id;
    this.property_Name                =   property.property_Name;
    this.property_county              =   property.property_county;
    this.property_town                =   property.property_town;
    this.property_owner               =   property.property_owner;
    this.property_agent               =   property.property_agent;
    this.property_units               =   property.property_units;
    this.property_water_charge        =   property.property_water_charge;
    this.property_kplc_charge         =   property.property_kplc_charge;
    this.property_kplc_charge         =   property.property_garbage_charge;
    this.property_images              =   property.property_images;
    
}


Property.getAllProperties = (callBack )=>{
    dbConn.query('SELECT * FROM properties',
    (error,results,fields)=>{
        if(error){
            callBack(error)
        }
        return callBack(null,results);
    })
}

Property.getAllProperties = (callBack )=>{
    dbConn.query('SELECT * FROM properties',
    (error,results,fields)=>{
        if(error){
            callBack(error)
        }
        return callBack(null,results);
    })
}

Property.getPropertyByID = (id,callBack )=>{
    const conditionList = [id]
    const result = dbConn.query(`SELECT * FROM properties WHERE property_id = ?`,
    conditionList,
    (error,results,fields)=>{
        if(error){
            callBack(error)
        }
        return callBack(null,results);
    })
}

Property.   createProperty = (data,callBack) => {
    dbConn.query('INSERT INTO properties SET ?',
    data,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}
//get properties assigned by agent id
Property.getAgentPropertiesByID=(callBack)=> {
    try {
        const columnList = "*";
        
        //const result = dbConn.query(`SELECT * FROM properties WHERE property_agent IN (SELECT agent_id FROM agents WHERE agent_email= ?)`,
        const result = dbConn.query(`SELECT * FROM properties `,
    
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        if (typeof callBack === 'function') {
            return callBack(null, results)
        }
        
    })

    } catch (error) {
        console.log("error--",{error})
        throw error;
    }
}


Property.getAgentPropertiesByEmail=(id,callBack)=> {
    try {
        const columnList = "*";
        const conditionList = [id]
        const result = dbConn.query(`SELECT * FROM properties WHERE FIND_IN_SET((SELECT agent_id FROM agents WHERE agent_email= ?), property_agent)`,
        //const result = dbConn.query(`SELECT * FROM properties `,
    conditionList,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    })

    } catch (error) {
        console.log("error--",{error})
        throw error;
    }
}
//update property agents by id
Property.updatePropertyAgentsByID=(data,id,callBack)=> {
    try {
        const columnList = "*";
        const conditionList = [data,id]
        const result = dbConn.query(`UPDATE properties SET property_agent = ? WHERE properties.property_id = ?;`,
    conditionList,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    })

    } catch (error) {
        console.log("error--",{error})
        throw error;
    }
}
module.exports = Property;