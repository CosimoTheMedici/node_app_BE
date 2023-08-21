var db = require('../configs/db.config');

class User {

constructor(user) {
this.password = user.password;
this.uuid = user.uuid;
this.email = user.email;
this.user_category = user.user_category;
this.business_id = user.business_id;
this.status = user.status;
}

static async create(data) {
    try {
        const result = await db.query('INSERT INTO app_users SET ?', data);
        return result;
    } catch (error) {
        throw error;
    }
}

static async getByEmail1(email) {
    try {
        const columnList = 'id, unit_property_name, unit_property_id';
        const conditionList = [1, id.join(',')];
        //You can also pass the array of ids as a single string joined by a comma, like this:
        const query = `SELECT ${columnList} FROM units WHERE unit_property_name = ? and unit_property_id IN (${id})`;

        const result = await db.query(query, conditionList);
        return result;
    } catch (error) {
        throw error;
    }
}
static async getByEmail(email) {
    try {
        const [result] = await db.query('SELECT * FROM app_users WHERE email = ?', [email]);
        return result;
    } catch (error) {
        throw error;
    }
}
}

module.exports = User;




