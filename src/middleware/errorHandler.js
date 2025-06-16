// src/middleware/errorHandler.js
const { logSystemError, markSystemError } = require('./errorLogger');

const errorHandle = (err, req, res, next) => {
  // Log only system errors
  if (err.isSystemError || !err.isOperational) {
    logSystemError(markSystemError(err), {
      route: req.path,
      method: req.method,
      userId: req.user?.id
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.isSystemError ? 'Internal server error' : err.message;

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = { errorHandle };