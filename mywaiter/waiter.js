'use strict'
module.exports = function (models) {
  // body...
const index = function(req, res){
console.log("Loaded");
}
  const addWaiter = function(req, res){
    // res.send(req.params.username);
res.render("waitersview/waiter");
  }

  const daysWaiter = function(req, res){

  }

  return{
    index,
    addWaiter,
    daysWaiter
  }
};
