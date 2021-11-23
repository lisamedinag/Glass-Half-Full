module.exports = app => {

  // Base routes
  app.use('/', require("./base.routes"))

  // Auth routes 
  app.use('/', require("./auth.routes"))

   // Day routes 
  app.use('/calendar', require("./Day.routes"))

   // User routes 
   app.use('/profile', require("./user.routes"))

   // Week routes 
   app.use('/calendar', require("./Week.routes"))
} 