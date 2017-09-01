const mongoose = require('mongoose')
module.exports = function (mongoUrl) {

mongoose.connect(mongoUrl)

const waiterSchema = mongoose.Schema({
  name: String,
  days: []
})

waiterSchema.index({name : 1}, {unique : true})

const Waiters = mongoose.model('Waiters', waiterSchema)

return{
  Waiters
}
};
