'use strict'
module.exports = function(models) {
  // body...
  var convertName = function(reqName) {
    var name = reqName.substring(0, 1).toUpperCase() + "" + reqName.substring(1).toLowerCase()
    return name
  };

  var dayMap = {};
var daysObject = function(shifts) {
  for (var i = 0; i < shifts.days.length; i++) {
    if (dayMap[shifts.days[i]] === undefined) {
      // dayMap[shift.days[i]] = 0;
      dayMap[shifts.days[i]] = "checked";
    }
  }
  return dayMap
}

  const index = function(req, res) {
    res.render("waitersview/waiter")
  }
  const showWaiterScreen = function(req, res, next) {
    let username = convertName(req.params.username)
    let msg = "Welcome, " + username

    models.Waiters.findOne({
      name: username
    }, function(err, shifts) {
      if (shifts) {
        daysObject(shifts)
        res.render("waitersview/waiter", {
          username: username,
          shift: dayMap
        })
      } else {
        res.render("waitersview/waiter", {
          welcome: msg,
          username: username
        })

      }
    })
  }

  const addWaiter = function(req, res, next) {
    let waiter = {
      days: req.body.days,
      name: convertName(req.params.username)
    }

    if (waiter.days === undefined) {
      req.flash('error', 'Please select your shifts');
      res.render("waitersview/waiter", {
        username: waiter.name
      })
    } else {
      models.Waiters.create(waiter, function(err, success) {
        if (err) {
          if (err.code === 11000) {
            models.Waiters.findOne({
              name: waiter.name
            }, function(err, updateWaiter) {
              if (err) {
                return next(err)
              }else {
                updateWaiter.days = waiter.days
                updateWaiter.save()
                req.flash('error', "You have successfully updated your shifts")
                res.redirect("/waiters/"+updateWaiter.name);
              }
            })
          }
        } else {
          req.flash('error', 'You have successfully submitted your days');
          res.render("waitersview/waiter",{
            username: waiter.name
          })
        }
      })
    }
  }
  const admin = function(req, res, next) {
    res.render("waitersview/admin")
  }

  const getWaitersByDays = function(serverRes, btn, availWaiters) {
    if (btn === "Sunday") {
      serverRes.render('waitersview/admin', {
        sunWaiters: availWaiters,
        shadeSun: getColor(availWaiters.length)
      })
    } else if (btn === "Monday") {
      serverRes.render('waitersview/admin', {
        monWaiters: availWaiters,
        shadeMon: getColor(availWaiters.length)
      })
    } else if (btn === "Tuesday") {
      serverRes.render('waitersview/admin', {
        tuesWaiters: availWaiters,
        shadeTues: getColor(availWaiters.length)
      })
    } else if (btn === "Wednesday") {
      serverRes.render('waitersview/admin', {
        wedWaiters: availWaiters,
        shadeWed: getColor(availWaiters.length)
      })
    } else if (btn === "Thursday") {
      serverRes.render('waitersview/admin', {
        thursWaiters: availWaiters,
        shadeThur: getColor(availWaiters.length)
      })
    } else if (btn === "Friday") {
      serverRes.render('waitersview/admin', {
        frWaiters: availWaiters,
        shadeFri: getColor(availWaiters.length)
      })
    } else if (btn === "Saturday") {
      serverRes.render('waitersview/admin', {
        satWaiters: availWaiters,
        shadeSat: getColor(availWaiters.length)
      })
    }
  }

  const daysWaiter = function(req, res, next) {
    var btn = req.body.btnWaiter;
    models.Waiters.find({
      days: btn
    }).exec(function(err, availWaiters) {
      if (err) {
        return next(err);
      } else {
        getWaitersByDays(res, btn, availWaiters)
      }
    })

  }

  const getColor = function(availWaiters) {
    if (availWaiters > 3) {
      return "warning"

    } else if (availWaiters < 3) {
      return "danger"
    }else {
      return "success"
    }

  }
  const reset = function(req, res, next) {

    models.Waiters.remove({}).
    exec(function(err, results) {
      if (err) {
        return next(err);
      } else {
        res.redirect("/days");
      }
    });
  }
  return {
    index,
    showWaiterScreen,
    addWaiter,
    daysWaiter,
    admin,
    reset
  }
};
