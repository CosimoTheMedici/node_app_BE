const dbConn = require('../configs/db.config');

class User {
  constructor(user) {
    this.password = user.password;
    this.uuid = user.uuid;
    this.email = user.email;
    this.user_category = user.user_category;
    this.business_id = user.business_id;
    this.status = user.status;
  }

  /**
   * Create a new user
   * @param {Object} userData - User data to insert
   * @returns {Promise<Object>} - Insert result
   */
  static async create(userData) {
    try {
      const [result] = await dbConn.query(
        'INSERT INTO app_users SET ?', 
        [userData]
      );
      return result;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  /**
   * Find user by email (basic fields)
   * @param {string} email - User's email
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  static async findByEmail(email) {
    try {
      const [rows] = await dbConn.query(
        'SELECT * FROM app_users WHERE email = ?',
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to find user by email: ${error.message}`);
    }
  }

  /**
   * Find user by email (extended fields)
   * @param {string} email - User's email
   * @returns {Promise<Object|null>} - User object with selected fields or null
   */
  static async findByEmailExtended(email) {
    try {
      const [rows] = await dbConn.query(
        'SELECT id, uuid, email, user_category, business_id, status, refreshToken FROM app_users WHERE email = ?',
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to find user by email (extended): ${error.message}`);
    }
  }

  /**
   * Find user by refresh token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  static async findByRefreshToken(refreshToken) {
    try {
      const [rows] = await dbConn.query(
        'SELECT * FROM app_users WHERE refreshToken = ?',
        [refreshToken]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to find user by refresh token: ${error.message}`);
    }
  }

  /**
   * Update user's refresh token
   * @param {string} token - New refresh token
   * @param {string} email - User's email
   * @returns {Promise<Object>} - Update result
   */
  static async updateRefreshToken(token, email) {
    try {
      const [result] = await dbConn.query(
        'UPDATE app_users SET refreshToken = ? WHERE email = ?',
        [token, email]
      );
      return result;
    } catch (error) {
      throw new Error(`Failed to update refresh token: ${error.message}`);
    }
  }

  /**
   * Get all users
   * @returns {Promise<Array>} - Array of all users
   */
  static async findAll() {
    try {
      const [rows] = await dbConn.query('SELECT * FROM app_users');
      return rows;
    } catch (error) {
      throw new Error(`Failed to fetch all users: ${error.message}`);
    }
  }
}

module.exports = User;