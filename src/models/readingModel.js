
 var db = require('../configs/db.config');

class Reading {

constructor(reading) {

this.reading_id = reading.reading_id;
this.reading_propertyID = reading.reading_propertyID;
this.reading_unitID = reading.reading_unitID;
this.reading_utilityTypeID = reading.reading_utilityTypeID;
this.reading_prev_reading = reading.reading_prev_reading;
this.reading_nowReading = reading.reading_nowReading;
this.reading_record = reading.reading_record;
this.reading_date = reading.reading_date;
this.reading_status = reading.reading_status;
this.reading_createdBy = reading.reading_createdBy;
this.reading_visibility = reading.reading_visibility;
}

static async createUtilityReadinge(data) {
    try {
        const result = await db.query('INSERT INTO reading SET ?', data);
        return result;
    } catch (error) {
        throw error;
    }
}

static async createUtilityReading(data,callBack) {
    const conditionList = data
    db.query(`INSERT INTO reading SET ?`,
    conditionList,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}

static async getALLUtilityReadings(callBack) {
    try {
        const columnList = "*";
        //const conditionList = [data]
        const result = db.query(`SELECT unit_name,	property_Name,reading_id, reading_propertyID, reading_unitID, reading_utilityTypeID, reading_prev_reading, reading_nowReading, reading_record, reading_amount, reading_date, reading_status, reading_createdBy, reading_visibility, reading_payment_status, reading_I_N FROM reading LEFT JOIN properties on properties.property_id = reading.reading_propertyID LEFT JOIN units on units.unit_id = reading.reading_unitID`,

        //const result = db.query(`SELECT * FROM utility_Charges `,
    //conditionList,
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

}



module.exports = Reading;




