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
    let msg = "Welcome " + username

    models.Waiters.findOne({
      name: username
    }, function(err, shifts) {
      if (shifts) {
        daysObject(shifts)
        console.log(shifts.days);
        res.render("waitersview/waiter", {
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

    }else {
      models.Waiters.create(waiter, function(err, success) {
        if (err) {
          return next(err)
        } else {
          req.flash('error', 'You have successfully submitted your days');
          res.render("waitersview/waiter")
        }

      })
    }
  }
  const daysWaiter = function(req, res, next) {
    var monArray = []
    var sunArray = []
    var tuesArray = []
    var wedArray = []
    var thursArray = []
    var frArray = []
    var satArray = []

    models.Waiters.find({}, function(err, shifts) {
      if (err) {
        return next(err)
      } else {
        for (var i = 0; i < shifts.length; i++) {
          for (var j = 0; j < shifts[i].days.length; j++) {
              if (shifts[i].days[j] === "Monday") {
                monArray.push(shifts[i].name)
                console.log(shifts[i].name);
              }else if (shifts[i].days[j] === "Tuesday") {
                tuesArray.push(shifts[i].name)

              }else if (shifts[i].days[j] === "Wednesday") {
                wedArray.push(shifts[i].name)

              }else if (shifts[i].days[j] === "Thursday") {
                thursArray.push(shifts[i].name)

              }
              else if (shifts[i].days[j] === "Friday") {
                frArray.push(shifts[i].name)

              }
              else if (shifts[i].days[j] === "Saturday") {
                satArray.push(shifts[i].name)

              }else if (shifts[i].days[j] === "Sunday") {
                sunArray.push(shifts[i].name)

              }
            }
            // break
        }
        res.render("waitersview/admin", {
          monWaiters:   monArray,
          tuesWaiters:  tuesArray,
          wedWaiters:   wedArray,
          thursWaiters: thursArray,
          frWaiters: frArray,
          satWaiters: satArray,
          sunWaiters: sunArray
        })

      }
      monArray = 0;
      tuesArray = 0;

    })
  }

  return {
    index,
    showWaiterScreen,
    addWaiter,
    daysWaiter
  }
};
