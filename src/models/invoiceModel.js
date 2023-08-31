
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


}