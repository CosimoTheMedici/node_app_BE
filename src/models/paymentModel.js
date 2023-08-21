var db = require('../configs/db.config')


class Payments {

constructor(payment) {

    this.payment_id = payment.payment_id;
    this.payment_propertyName = payment.payment_propertyName;
    this.payment_unitName = payment.payment_unitName;
    this.payment_method = payment.payment_method;
    this.payment_reference_no = payment.payment_reference_no;
    this.payment_amount = payment.payment_amount;
    this.payment_date = payment.payment_date;
    this.payment_status = payment.payment_status;
    this.createdBy = payment.createdBy;
    this.payment_visibility = payment.payment_visibility;
   

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

static async getPaymentByCreatedID(id,callBack) {
    try {
        const columnList = "*";
        const conditionList = [id]
        //const result = db.query(`SELECT * FROM payments LEFT JOIN WHERE createdBy  = ?`,
        const result = db.query(`SELECT * FROM payments LEFT JOIN properties ON properties.property_id = payment_propertyName LEFT JOIN units ON payment_unitName= units.unit_id WHERE createdBy  = ?`,
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

static async getPaymentLastRecord(data,callBack) {
    const conditionList = data
    db.query(`SELECT * FROM transactions WHERE transaction_propertyID = ? AND transaction_unitID = ? ORDER BY transaction_date DESC LIMIT 1;`,
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

module.exports = Payments;