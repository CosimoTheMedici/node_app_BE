var db = require('../configs/db.config')


class Owner {

constructor(owner) {

    this.owner_id = owner.owner_id;
    this.owner_firstname = owner.owner_firstname;
    this.owner_secondname = owner.owner_secondname;
    this.owner_IDnumber = owner.owner_IDnumber;
    this.owner_email = owner.owner_email;
    this.owner_phone = owner.owner_phone;
    this.owner_properties = owner.owner_properties;
    this.owner_status = owner.owner_status;
    this.owner_visibility = owner.owner_visibility;
 
   

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
static async createPayment(data,callBack) {
    const conditionList = [data]
    db.query(`INSERT INTO payments SET ?`,
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

module.exports = Owner;