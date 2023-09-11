
var db = require('../configs/db.config')


class Unit {

constructor(unit) {

    this.unit_id             = unit.unit_id;
    this.unit_name           = unit.unit_name;
    this.unit_property_id    = unit.unit_property_id;
    this.unit_rent_Amount    = unit.unit_rent_Amount;
    this.unit_water_charge   = unit.unit_water_charge;
    this.unit_kplc_charge    = unit.unit_kplc_charge;
    this.unit_garbage_charge = unit.unit_garbage_charge;
    this.unit_description    = unit.unit_description;
    this.unit_occupancy      = unit.unit_occupancy;
    this.unit_status         = unit.unit_status;
    this.unit_type           = unit.unit_type
}

static async createUnit(data,callBack) {
    try {
        const columnList = "*";
        const conditionList = [data]
        const result = db.query(`INSERT INTO units SET ?`,
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
static async updateUnitOccupancy(data,callBack) {
    try {
        const columnList = "*";
        const conditionList = data
        const result = db.query(`UPDATE units SET unit_occupancy = 2 WHERE unit_id = ?;`,
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

static async getAllUnitsByPropertyID(id) {
    try {
        const result = await db.query('SELECT * FROM units WHERE unit_property_id = ?', [id]);
        return result;
    } catch (error) {
        throw error;
    }
}
static async getAllVacantUnitsByPropertyID1(id) {
    try {
        const result = await db.query('SELECT * FROM units WHERE unit_occupancy=2 AND unit_property_id = ?', [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

static async getAllVacantUnitsByPropertyID(data,callBack) {
    try {
        const columnList = "*";
        const conditionList = [data]
        const result = db.query(`SELECT * FROM units WHERE unit_occupancy=1 AND unit_property_id = ?`,
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

static async getAllOccupiedUnitsByPropertyID(data,callBack) {
    try {
        const columnList = "*";
        const conditionList = [data]
        const result = db.query(`SELECT * FROM units WHERE unit_occupancy=2 AND unit_property_id = ?`,
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


static async getAllUnitsByPropertyID  (data,callBack) {
    db.query('SELECT * FROM units WHERE unit_property_id = ?',
    data,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}

static async getAgentUnitsByAgentEmail(email,callBack) {
    try {
        const columnList = "*";
        const conditionList = [email]
        //SELECT * FROM units Left JOIN properties ON properties.property_id = units.unit_property_id where unit_property_id IN(SELECT property_id FROM properties WHERE property_agent IN (SELECT agent_id FROM agents WHERE agent_email= 'judas@gmail.com'))
        //const result = db.query(`SELECT * FROM units Left JOIN properties ON properties.property_id = units.unit_property_id WHERE unit_property_id IN(SELECT property_id FROM properties WHERE property_agent IN (SELECT agent_id FROM agents WHERE agent_email= ?))`,
        const result = db.query( 
             `SELECT 
        u.unit_id, 
        u.unit_name, 
        u.unit_property_id, 
        u.unit_rent_Amount, 
        u.unit_water_charge, 
        u.unit_status, 
        u.unit_description, 
        u.unit_kplc_charge, 
        u.unit_occupancy, 
        u.unit_status, 
        u.unit_type, 
        u.unit_garbage_charge,
        p.property_Name,
        p.property_id,
        (
          SELECT GROUP_CONCAT(
            JSON_OBJECT(
              "charge_id", c.charge_id,
              "charge_property_id", c.charge_property_id,
              "charge_name", c.charge_name,
              "charge_type", c.charge_type,
              "charge_per_unit", c.charge_per_unit
            )
          )
          FROM utility_Charges c 
          WHERE u.unit_property_id IN(SELECT property_id FROM properties WHERE property_agent IN (SELECT agent_id FROM agents WHERE agent_email= ?)) 
          AND   c.charge_id in(u.unit_kplc_charge,u.unit_garbage_charge,u.unit_water_charge)
        ) AS charges
    FROM units u
    JOIN properties p ON u.unit_property_id = p.property_id
    `,
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

static async getAllVisibleUnits(email,callBack) {
    try {
        const columnList = "*";
        const result = db.query(
    //     `SELECT 
    //     u.unit_id, 
    //     u.unit_name, 
    //     u.unit_property_id, 
    //     u.unit_rent_Amount, 
    //     u.unit_water_charge, 
    //     u.unit_status, 
    //     u.unit_description, 
    //     u.unit_kplc_charge, 
    //     u.unit_occupancy, 
    //     u.unit_status, 
    //     u.unit_type, 
    //     u.unit_garbage_charge,
    //     p.property_Name,
    //     p.property_id,
    //     GROUP_CONCAT( JSON_OBJECT(
    //         'charge_id', c.charge_id,
    //         'charge_property_id', c.charge_property_id,
    //         'charge_name', c.charge_name,
    //         'charge_type', c.charge_type
    //       )
    //     ) as charges 
    //   FROM 
    //     units u 
    //     LEFT JOIN utility_Charges c ON (
    //       u.unit_garbage_charge = c.charge_id 
    //       OR u.unit_water_charge = c.charge_id 
    //       OR u.unit_kplc_charge = c.charge_id
    //     ) LEFT Join properties p ON u.unit_property_id = p.property_id
    //   GROUP BY 
    //     u.unit_id`
    
    `SELECT 
    u.unit_id, 
    u.unit_name, 
    u.unit_property_id, 
    u.unit_rent_Amount, 
    u.unit_water_charge, 
    u.unit_status, 
    u.unit_description, 
    u.unit_kplc_charge, 
    u.unit_occupancy, 
    u.unit_status, 
    u.unit_type, 
    u.unit_garbage_charge,
    p.property_Name,
    p.property_id,
    (
      SELECT GROUP_CONCAT(
        JSON_OBJECT(
          "charge_id", c.charge_id,
          "charge_property_id", c.charge_property_id,
          "charge_name", c.charge_name,
          "charge_type", c.charge_type,
          "charge_per_unit", c.charge_per_unit
        )
      )
      FROM utility_Charges c
      WHERE c.charge_id in(u.unit_kplc_charge,u.unit_garbage_charge,u.unit_water_charge)
    ) AS charges
FROM units u
JOIN properties p ON u.unit_property_id = p.property_id
`,
    
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
static async getUnitDataBypropIDunitID1(conditionList) {
    try {
        const columnList = "*";
        const result = await db.query(`SELECT * FROM units WHERE unit_property_id =? and unit_id = ? `,
    conditionList,
    (error,results,field) => {
        if(error){
            return error;
        }
        
        return results

    })

    } catch (error) {
        console.log("error--",{error})
        throw error;
    }
}
//legit
  static async getUnitDataBypropIDunitID  (conditionList) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM units WHERE unit_property_id = ? AND unit_id = ?', conditionList, (error, results) => {
           
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

  

static async getUnitDataByUnitID  (data,callBack) {
    db.query('SELECT * FROM units WHERE unit_id = ?',
    data,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }
    )
}
}

module.exports = Unit;
