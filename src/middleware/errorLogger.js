// src/middleware/errorLogger.js
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

const logSystemError = (error, context = {}) => {
  if (!(error instanceof Error) && !error.isSystemError) return;

  const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  const logEntry = {
    timestamp,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code || 'UNKNOWN_ERROR'
    },
    context,
    systemInfo: {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsage: process.memoryUsage()
    }
  };

  const logsDir = path.join(__dirname, '../logs');
  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

  const logFileName = `system_errors_${format(new Date(), 'yyyy-MM-dd')}.log`;
  const logPath = path.join(logsDir, logFileName);

  try {
    fs.appendFileSync(logPath, JSON.stringify(logEntry, null, 2) + ',\n');
    console.error(`[SYSTEM ERROR] ${timestamp}: ${error.message}`);
  } catch (writeError) {
    console.error('Failed to write error log:', writeError);
  }
};

const markSystemError = (error) => {
  error.isSystemError = true;
  return error;
};

module.exports = { logSystemError, markSystemError };