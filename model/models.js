const mongoose = require('mongoose')
module.exports = function (mongoUrl) {
  // Use native promises
mongoose.Promise = global.Promise
mongoose.connect(mongoUrl)

const waiterSchema = mongoose.Schema({
  name: String,
  days: [String]
})

waiterSchema.index({name : 1}, {unique : true})

const Waiters = mongoose.model('Waiters', waiterSchema)

return{
  Waiters
}
};
