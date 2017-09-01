'use strict'
module.exports = function (models) {
  // body...
const index = function(req, res){
console.log("Loaded");
}
  const addWaiter = function(req, res){
    // res.send(req.params.username);
    let msg = "Welcome "+req.params.username
res.render("waitersview/waiter",{
  welcome: msg
})
  }

  const daysWaiter = function(req, res){

  }

  return{
    index,
    addWaiter,
    daysWaiter
  }
};
