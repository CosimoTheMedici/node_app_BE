var db = require('../configs/db.config')


class Agent {

constructor(agent) {

    this.agent_id = agent.agent_id;
    this.agent_firstname = agent.agent_firstname;
    this.agent_secondname = agent.agent_secondname;
    this.agent_lastname = agent.agent_lastname;
    this.agent_IDnumber = agent.agent_IDnumber;
    this.agent_email = agent.agent_email;
    this.agent_phone = agent.agent_phone;
    this.agent_properties = agent.agent_properties;
    this.agent_status = agent.agent_status;
    this.agent_visibility = agent.agent_visibility;
    this.createdBy = agent.createdBy;
 
   

}

static async createUser(data,callBack) {
    const conditionList = [data]
    db.query(`INSERT INTO app_users SET ?`,
    conditionList,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}

static async getAgentsByPropertyId(id) {
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
static async getAgentsByOwnerId(id,callBack) {
    try {
        const columnList = "*";
        const conditionList = [id]
        //const result = db.query(`SELECT * FROM agents WHERE createdBy  = ?`,
        const result = db.query(`SELECT * FROM agents `,
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

static async getAgentsById(id,callBack) {
    try {
        const columnList = "*";
        const conditionList = [id]
        //const result = db.query(`SELECT * FROM utility_Charges WHERE charge_name = ? and charge_property_id IN (?)`,
        const result = db.query(`SELECT * FROM agents WHERE   agent_id= ?`,
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

static async getAgentPropertiesByEmail(email,callBack) {
    try {
        const columnList = "*";
        const conditionList = [email]
        //const result = db.query(`SELECT * FROM utility_Charges WHERE charge_name = ? and charge_property_id IN (?)`,
        const result = db.query(`SELECT * FROM agents WHERE agent_email  = ?`,
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
static async updateAgentspropertiesById(data,id,callBack) {
    try {
        const conditionList = [data,id]
        //const result = db.query(`SELECT * FROM utility_Charges WHERE charge_name = ? and charge_property_id IN (?)`,
        const result = db.query(`UPDATE agents SET agent_properties = ? WHERE agents.agent_id = ?`,
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


static async createAgent(data,callBack) {
    const conditionList = [data]
    db.query(`INSERT INTO agents SET ?`,
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

module.exports = Agent;