module.exports = app => {

  // Base routes
  app.use('/', require("./base.routes"))

  // Auth routes 
  app.use('/', require("./auth.routes"))

}