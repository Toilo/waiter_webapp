'use strict'
module.exports = function(models) {
  // body...
  var convertName = function(reqName) {
    var name = reqName.substring(0, 1).toUpperCase() + "" + reqName.substring(1).toLowerCase()
    return name
  };

  const index = function(req, res) {
    // res.render("waitersview/waiter")
  }
  const showWaiterScreen = function(req, res, next) {
    let username = convertName(req.params.username)
    let msg = "Welcome " +username
    var dayMap = {};
    models.Waiters.findOne({name: username}).exec(function(err, shift){

// for (var i = 0; i < shift.days.length; i++) {
//   console.log(shift.days[i]);
//
//       if (dayMap[shift.days[i]] === undefined) {
//         dayMap[shift.days[i]] = 0;
//       }
//       dayMap[shift.days[i]] += 1;
// }

      console.log(dayMap);
      if (shift) {
        console.log(shift.days);
        res.render("waitersview/waiter", {
          shift: shift.days
        })
      }else {
        res.render("waitersview/waiter", {
          welcome: msg,
          username:username
        })

      }
    })
  }

const addWaiter = function(req, res, next){
    let waiter = {
    name: convertName(req.params.username),
    days: [req.body.days]
  }
  models.Waiters.create(waiter, function(err, success) {
    if (err) {
      return next(err)
    }else {
      req.flash('error', 'You have successfully submitted your days');
      res.render("waitersview/waiter")
    }

  })
}

  const daysWaiter = function(req, res) {

  }

  return {
    index,
    showWaiterScreen,
    addWaiter,
    daysWaiter
  }
};
