exports.rolesValidator = (allowedRoles) => {
  return (req, res, next) => {
    //console.log(req )
    let token = req.headers.authorization || req.headers.Authorization
    if(!req?.roles) return res.sendStatus(401);
    const rolesArray = [allowedRoles];
    
    // console.log("rolesArray",rolesArray)
    // console.log("req.roles",req.roles)
    let cat = req.roles;
        cat = cat.map(Number);

    // console.log("rolesArray",rolesArray)
    // console.log("req.roleshm",cat)

    const result = cat.map(role => rolesArray.includes(role)).find(val => val === true);
    if(!result) return res.sendStatus(402);
    next();

  }
}




// exports.rolesValidator = (allowedRoles) => {
//   return (req, res, next) => {
//     if (!req.roles) {
//       return res.sendStatus(401);
//     }
//     const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

//     const result = req.roles.some(role => rolesArray.includes(role));
//     if (!result) {
//       return res.sendStatus(402);
//     }
//     next();
//   };
// };