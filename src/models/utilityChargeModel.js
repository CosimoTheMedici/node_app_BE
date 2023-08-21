var db = require('../configs/db.config')


exports.getInArraysChargesByPropertyID = async (req, res) => {
    try {
        const id = req.params.id;
        let token = req.headers.authorization;
        token = token.slice(7);
        const decoded = jwt_decode(token);
        console.log("decoded---", decoded.email);
        const email = decoded.email;

        const testBody = {
            email: decoded.email,
            createdBy: decoded.email
        };

        const user = await validateUser(testBody);

        console.log("user.email", user.email);

        const role = user.user_category.split(',')[1];
        if (role === '5000') {
            const waterCharge = await ChargeModel.getWaterchargesByAgentProperties();
            const KPLCCharge = await ChargeModel.getKPLCchargesByAgentProperties();
            const garbageCharge = await ChargeModel.getGarbagechargesByAgentProperties();

            const results = {
                waterCharge,
                KPLCCharge,
                garbageCharge
            };

            return sendResponse(res, 1, results, 200, "data");
        }
    } catch (error) {
        console.error("Error:", error);
        return sendResponse(res, 0, "", 500, `Error: ${error.message}`);
    }
};

class UtilityChargeModel {
    static async getWaterchargesByAgentProperties() {
        try {
            return await this.getChargesByAgentProperties(1);
        } catch (error) {
            console.log("Error:", error);
            throw error;
        }
    }

    static async getKPLCchargesByAgentProperties() {
        try {
            return await this.getChargesByAgentProperties(2);
        } catch (error) {
            console.log("Error:", error);
            throw error;
        }
    }

    static async getGarbagechargesByAgentProperties() {
        try {
            return await this.getChargesByAgentProperties(3);
        } catch (error) {
            console.log("Error:", error);
            throw error;
        }
    }

    static async getChargesByAgentProperties(chargetype) {
        try {
            let result
                  result = await db.query(`SELECT * FROM utility_Charges WHERE charge_type = ?`, [chargetype]);
            return result;
        } catch (error) {
            console.log("Error:", error);
            throw error;
        }
    }
}
module.exports = UtilityChargeModel;