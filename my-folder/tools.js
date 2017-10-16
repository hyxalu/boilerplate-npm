var strftime = require('strftime')

module.exports = {
  parseArg: function(str)
  {
    var intArg = parseInt(str);
    var obj = {
      "unix": null,
      "natural": null
    };
    if(intArg !== NaN)
    {
      console.log(intArg);
      var date = new Date(1000*intArg);
      console.log(new Date())
      console.log(date)
      obj.unix = intArg;
      obj.natural = strftime('%B %Y, %-d', date);
    }
    return JSON.stringify(obj);
  }
}