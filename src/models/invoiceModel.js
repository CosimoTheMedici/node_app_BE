
var db = require('../configs/db.config')


class Invoice {

constructor(invoice) {

    this.invoiceID        = invoice.invoiceID;
    this.invoiceNumber    = invoice.invoiceNumber;
    this.tenantID         = invoice.tenantID;
    this.waterChar        = invoice.waterCharge
    this.garbageCharge    = invoice.garbageCharge;
    this.kplcCharge       = invoice.kplcCharge;
    this.amountDue        = invoice.amountDue;
    this.dateOfInvoice    = invoice.dateOfInvoice;
    this.dateDue          = invoice.dateDue;
    this.status           = invoice.status;
    this.desc             = invoice.desc;
    this.createdBy        = invoice.createdBy;
    this.updatedBy        = invoice.updatedBy;
}

static async getInvoices() {
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

static async getUnitsAndConsumptionData  (conditionList) {
    return new Promise((resolve, reject) => {
        db.query('SELECT p.property_Name,ROW_NUMBER() OVER (ORDER BY units.unit_id) AS _id,units.*, reading.reading_id AS max_reading_id,reading.* FROM units LEFT JOIN reading ON reading.reading_unitID = units.unit_id LEFT JOIN properties p ON units.unit_property_id = p.property_id WHERE units.unit_occupancy = 2 and units.unit_status = 1 and reading.reading_id = ( SELECT MAX(r.reading_id) FROM reading AS r WHERE r.reading_unitID = units.unit_id )', conditionList, (error, results) => {
           
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

static async getUnitsGarbageData  (conditionList) {
    return new Promise((resolve, reject) => {
        db.query('SELECT units.*, reading.reading_id AS max_reading_id,reading.* FROM units LEFT JOIN reading ON reading.reading_unitID = units.unit_id WHERE reading.reading_id = ( SELECT MAX(r.reading_id) FROM reading AS r WHERE r.reading_unitID = units.unit_id )', conditionList, (error, results) => {
           
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
static async getUnitsKPLCData  (conditionList) {
    return new Promise((resolve, reject) => {
        db.query('SELECT units.*, reading.reading_id AS max_reading_id,reading.* FROM units LEFT JOIN reading ON reading.reading_unitID = units.unit_id WHERE reading.reading_id = ( SELECT MAX(r.reading_id) FROM reading AS r WHERE r.reading_unitID = units.unit_id )', conditionList, (error, results) => {
           
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


}

module.exports = Invoice;