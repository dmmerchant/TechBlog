const moment = require('moment')

module.exports = {
  format_date: date => {
    const currentUtcOffset = moment(date).utcOffset()
    return moment(date).utc(currentUtcOffset).format("ddd MMM Do YYYY h:mm:ss a");;
  },
  compareDate: (date1, date2, options) => {
    var results = (moment(date1).format("ddd MMM Do YYYY h:mm:ss a") === moment(date2).format("ddd MMM Do YYYY h:mm:ss a"))
        return results ? options.fn(this) : options.inverse(this);
  },
  compareDateINV: (date1, date2, options) => {
    var results = (moment(date1).format("ddd MMM Do YYYY h:mm:ss a") === moment(date2).format("ddd MMM Do YYYY h:mm:ss a"))
        return results ? options.inverse(this) : options.fn(this);
  },
  compareValues: (value1,value2,options) => {
    if (!value1 || value1 === '') {
      return options.inverse(this)
    } else {
      return (value1 == value2) ? options.fn(this) : options.inverse(this)
    }
  },
  compareValuesINV: (value1,value2,options) => {
    if (!value1 || value1 === '') {
      return options.inverse(this)
    } else {
      return (value1 == value2) ? options.inverse(this) : options.fn(this)
    }
  },
  screenCheck: (screen1, screen2,options) => {
    console.log(screen1)
    return (screen1 == screen2) ? options.fn(this) : options.inverse(this)
  },
  screenCheckINV: (screen1, screen2,options) => {
    return (screen1 == screen2) ? options.inverse(this) : options.fn(this)
  },
  style: (value1,value2,invert = false) => {
    if (!value1) {
      return (invert) ? "display: initial" : "display: none";
    }
    result = (value1 == value2);
    if (invert) {
      result = !result
    } 
    return (result) ? "display: none" : "display: initial" 
  },
  checkNull: (value,options) => {
    if (!value || value === '') {
      return options.inverse(this)}
  },
  setVarByName: (name, value) => {
    data[name] = value; // changed from this to data
    return '';
  },
  setPartialData: (obj) => {
    return JSON.stringify(obj);
  }
};
