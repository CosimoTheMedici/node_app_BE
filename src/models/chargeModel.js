var db = require('../configs/db.config')


class Charge {

constructor(charge) {

    this.charge_id             = charge.charge_id;
    this.charge_property_id    = charge.charge_property_id;
    this.charge_name           = charge.charge_name;
    this.charge_type           = charge.charge_type
    this.charge_status         = charge.charge_status;
    this.charge_per_unlit      = charge.charge_per_unlit;
    this.charge_created_by     = charge.charge_created_by;
    this.charge_visibility     = charge.charge_visibility;
    this.charge_description    = charge.charge_description;
}

static async getAllChargesByPropertyID1(id) {
    try {
        const columnList = "*";
        const conditionList = [1, ...id]
        //const query = `SELECT ${columnList} FROM utility_Charges WHERE charge_name = ? and charge_property_id IN (?)`
        const result = db.query(`SELECT * FROM utility_Charges WHERE charge_name = ? and charge_property_id IN (?)`,
    conditionList)
        //const result  = await db.query(query, conditionList);
        console.log("results--",result)
        return result;
    } catch (error) {
        console.log("error--",{error})
        throw error;
    }
}

static async getAllChargesByPropertyID(id,callBack) {
    const conditionList = [1, ...id]
    db.query(`SELECT * FROM utility_Charges WHERE charge_name = ? and charge_property_id IN (?)`,
    conditionList,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}

static async getConsumptionLastRecord(data,callBack) {
    const conditionList = data
    db.query(`SELECT MAX(reading_id) AS latest_id FROM reading WHERE reading_propertyID = ? and reading_unitID =?   and reading_utilityTypeID = ?`,
    conditionList,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}
static async createUtilityCharge(data,callBack) {
    const conditionList = [data]
    db.query(`INSERT INTO utility_Charges SET ?`,
    conditionList,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}
static async getChargesByType(chargeType) {
    try {
        const result = await db.query(`SELECT * FROM utility_Charges WHERE charge_type = ?`, [chargeType]);
        return result;
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
}
static async getchargesByAgentProperties(callBack) {
    try {
        const columnList = "*";
        //const result = db.query(`SELECT * FROM utility_Charges WHERE charge_name = ? and charge_property_id IN (?)`,
        //const result = db.query(`SELECT * FROM utility_Charges WHERE charge_property_id IN (SELECT agent_properties FROM agents WHERE agent_email=?)`,
        const result = db.query(`SELECT * FROM utility_Charges `,
    (error,results,field) => {
        console.log("error---->",error)
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

static async getchargesByAgentPropertiesByEmail(data,callBack) {
    try {
        const columnList = "*";
        const conditionList = [data]
        //const result = db.query(`SELECT * FROM utility_Charges WHERE charge_name = ? and charge_property_id IN (?)`,
        //const result = db.query(`SELECT * FROM utility_Charges WHERE charge_property_id IN (SELECT agent_properties FROM agents WHERE agent_email=?)`,
        const result = db.query(`SELECT * FROM utility_Charges WHERE FIND_IN_SET(charge_property_id,(SELECT agent_properties FROM agents WHERE agent_email= ? ))`,

        //const result = db.query(`SELECT * FROM utility_Charges `,
    conditionList,
    (error,results,field) => {
        //console.log("error---->",error)
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

static async getchargesByAgentPropertiesChargeType(data,callBack) {
    try {
        const columnList = "*";
        const conditionList = data
        //const result = db.query(`SELECT * FROM utility_Charges WHERE charge_name = ? and charge_property_id IN (?)`,
        //const result = db.query(`SELECT * FROM utility_Charges WHERE charge_type = ? AND charge_property_id IN (SELECT agent_properties FROM agents WHERE agent_email=?)`,
        const result = db.query(`SELECT * FROM utility_Charges `,

    (error,results,field) => {
        console.log("error---->",error)
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

static async getutilityChargesData1(data,callBack) {
    try {
        const columnList = "*";
        const conditionList = [data]
        console.log("data----->",data)
        //const result = db.query(`SELECT * FROM utility_Charges WHERE charge_name = ? and charge_property_id IN (?)`,
        const result = db.query(`SELECT * FROM utility_Charges WHERE charge_property_id= ? AND charge_name=? AND charge_type=?`,
    conditionList,
    (error,results,field) => {
        if(error){
            return error;
        }
        return callBack(null, results)
    })

    } catch (error) {
        console.log("error--",{error})
        throw error;
    }
}
static  getutilityChargesData1(conditionList) {
    try {
      // Use a constant to store the columns to be selected
      const columnList = "*";
  
      // Use a constant to store the query result
      const result =  db.query(`
        SELECT ${columnList} FROM utility_Charges WHERE charge_property_id= ? AND charge_name =? AND charge_type = ?`, conditionList);
  
      // Return the query result
      return result;
    } catch (error) {
      // Log the error
      console.log("error--", { error });
  
      // Throw the error to be caught by the calling function
      throw error;
    }
  }


static async getutilityChargesData  (conditionList) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM utility_Charges WHERE charge_property_id = ?  AND charge_type = ?', conditionList, (error, results) => {
           console.log("query")
            if (error) {
                reject(error);
            }
            if (results ) {
                console.log("results",results)
                resolve(results);
            } else {
                resolve(null);
            }
        });
    });
}
}
module.exports = Charge;