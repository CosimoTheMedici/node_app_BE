const sendResponse = (res, success, data,code, message) => {
  return res.status(code).json({
    success: success ? 1 : 0,
    data: data,
    message: message
  });
}


module.exports = {sendResponse};