const mongoose = require("mongoose")

module.exports = {
  cleanText: text => text.trim(),
  capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  checkMongoID: id => mongoose.Types.ObjectId.isValid(id),
  formatDate: date => {
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    let year = date.getFullYear()

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-')
  },

  //  arrayOfSameEvents : (allEvents, day_id) => {
  //   let sameDayEvents = []
  //   for (let i = 0; i < allEvents.length; i++) {
  //     if (allEvents[i].date === day_id) {
  //       sameDayEvents.push(events[i]) 
  //     }
  //     return sameDayEvents
  //   }
  // },

  isAdmin: (user) => user.role === "ADMIN",
  isMod: (user) => user.role === "MOD",
  isOwner: (user) => user.isOwner?.equals(user._id),
}

