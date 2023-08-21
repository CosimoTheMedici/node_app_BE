var db = require('../configs/db.config')


class Transaction {

constructor(transaction) {

    this.transaction_id = transaction.transaction_id;
    this.transaction_paymentID = transaction.transaction_paymentID;
    this.transaction_propertyID = transaction.transaction_propertyID;
    this.transaction_unitID = transaction.transaction_unitID;
    this.transaction_openingBal = transaction.transaction_openingBal;
    this.transaction_rentAmount = transaction.transaction_rentAmount;
    this.transaction_waterCharge = transaction.transaction_waterCharge;
    this.transaction_garbageCharge = transaction.transaction_garbageCharge;
    this.transaction_powerCharge = transaction.transaction_powerCharge;
    this.transaction_otherCharge = transaction.transaction_otherCharge;
    this.transaction_payment = transaction.transaction_payment;
    this.transaction_balance = transaction.transaction_balance;
    this.transaction_closingBal = transaction.transaction_closingBal;
    this.transaction_visibility = transaction.transaction_visibility;

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
    db.query(`INSERT INTO transactions SET ?`,
    conditionList,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}
static async getLastTranDataBypropIDunitID  (conditionList) {
    return new Promise((resolve, reject) => {
        //db.query('SELECT * FROM transactions WHERE transaction_propertyID = ? AND transaction_unitID = ?', conditionList, (error, results) => {
        db.query('SELECT * FROM transactions WHERE transaction_date = (SELECT MAX(transaction_date) FROM transactions WHERE transaction_propertyID = ? AND transaction_unitID = ?) AND transaction_propertyID = ? AND transaction_unitID = ?', conditionList, (error, results) => {
           
            if (error) {
                reject(error);
            }
        
            if (results.length > 0) {
                
                resolve(results);

            } else {
                let reslist = {
                    transaction_id:0,
                    transaction_paymentID:0,
                    transaction_propertyID:conditionList[0],
                    transaction_unitID:conditionList[1],
                    transaction_openingBal:0,
                    transaction_rentAmount:0,
                    transaction_waterCharge:0,
                    transaction_garbageCharge:0,
                    transaction_powerCharge:0,
                    transaction_otherCharge:0,
                    transaction_payment:0,
                    transaction_balance:0,
                    transaction_closingBal:0,
                    transaction_visibility:0,
                    transaction_date:0
                }
               let resLit =[{
                   'transaction_id':reslist.transaction_id,
                   'transaction_paymentID':reslist.transaction_paymentID,
                    'transaction_propertyID':reslist.transaction_propertyID,
                    'transaction_unitID':reslist.transaction_unitID,
                    'transaction_openingBal':reslist.transaction_openingBal,
                    'transaction_rentAmount':reslist.transaction_rentAmount,
                    'transaction_waterCharge':reslist.transaction_waterCharge,
                    'transaction_garbageCharge':reslist.transaction_garbageCharge,
                    'transaction_powerCharge':reslist.transaction_powerCharge,
                    'transaction_otherCharge':reslist.transaction_otherCharge,
                    'transaction_payment':reslist.transaction_payment,
                    'transaction_balance':reslist.transaction_balance,
                    'transaction_closingBal':reslist.transaction_closingBal,
                    'transaction_visibility':reslist.transaction_visibility,
                    'transaction_date':reslist.transaction_date
               }
                ]
                resolve(resLit);
            }
        });
    });
}
}

module.exports = Transaction;