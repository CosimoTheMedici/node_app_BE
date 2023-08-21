
var db = require('../configs/db.config');

class Property {

constructor(property) {

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



static async createUtilityReading(data) {
    try {
        const result = await db.query('INSERT INTO reading SET ?', data);
        return result;
    } catch (error) {
        throw error;
    }
}

static async getUnitDataBypropIDunitID  (conditionList) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM reading WHERE reading_propertyID = ? AND reading_unitID = ?', conditionList, (error, results) => {
           
            if (error) {
                reject(error);
            }
            if (results.length > 0) {
                resolve(results);
            } else {
                resolve(null);
            }
        });
    });
}

static async getPropertiesByEmail  (data) {
    return new Promise((resolve, reject) => {
        const conditionList = [data]
        db.query('`SELECT * FROM properties WHERE FIND_IN_SET((SELECT agent_id FROM agents WHERE agent_email= ?), property_agent)', conditionList, (error, results) => {
           
            if (error) {
                reject(error);
            }
            if (results.length > 0) {
                resolve(results);
            } else {
                resolve(null);
            }
        });
    });
}


static async getPropertiesByEmail(data,callBack) {
    const conditionList = [data]
    db.query(`SELECT * FROM properties WHERE FIND_IN_SET((SELECT agent_id FROM agents WHERE agent_email= ?), property_agent)`, conditionList,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}
static async getAllProperties(id,callBack) {
    db.query(`SELECT * FROM properties`,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}



}

module.exports = Property;




