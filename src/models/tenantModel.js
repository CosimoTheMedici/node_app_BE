var db = require('../configs/db.config')


class Tenant {

constructor(tenant) {

    this.id = tenant.id;
    this.firstName = tenant.firstName;
    this.secondName = tenant.secondName;
    this.lastName = tenant.lastName;
    this.IDNumber = tenant.IDNumber;
    this.email = tenant.email;
    this.phoneNumber = tenant.phoneNumber;
    this.propertyID = tenant.propertyID;
    this.unitName = tenant.unitName;
    this.emergencyNumber = tenant.emergencyNumber;
    this.emergencyPerson = tenant.emergencyPerson;
    this.emergencyPersonRelation = tenant.emergencyPersonRelation;
    this.createdBy = tenant.createdBy;

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
static async getAllTenantByPropertyID(email,callBack) {
    const conditionList = [email]
    db.query(`SELECT * FROM tenants WHERE FIND_IN_SET(propertyID, (SELECT agent_properties FROM agents WHERE agent_email= ? ))`,
    //db.query(`SELECT * FROM utility_Charges WHERE charge_name = ? and charge_property_id IN (?)`,
    conditionList,
    (error,results,field) => {
        console.log("results ::",results)
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}

static async getAllTenantByAgentOwner(callBack) {
    db.query(`SELECT * FROM tenants LEFT JOIN units ON tenants.unitName = units.unit_id WHERE propertyID IN(SELECT property_id FROM properties)`,
    //db.query(`SELECT * FROM utility_Charges WHERE charge_name = ? and charge_property_id IN (?)`, 
    
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}
static async createTenant(data,callBack) {
    const conditionList = [data]
    db.query(`INSERT INTO tenants SET ?`,
    conditionList,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}
}

module.exports = Tenant;