var strftime = require('strftime')

module.exports = {
  parseArg: function(str)
  {
   
    // default value of return object
    var obj = {
      "unix": null,
      "natural": null
    };
    
    // if the argument is an integer
    if(/^\d+$/.test(str))
    {
      var intArg = parseInt(str, 10);
      var date = new Date(1000*intArg);
      obj.unix = intArg;
      obj.natural = strftime('%B %Y, %-d', date);
    }
    
    // if the argument is a natural date
    if(/^[A-Za-z]+\s*\d{1,2},\s*\d{4,4}\s*$/.test(str))
    {
      var myMatches = /^([A-Za-z]+)\s*(\d{1,2}),\s*(\d{4,4})\s*$/.exec(str);
      var month = myMatches[1];
      var day   = parseInt(myMatches[2]);
      var year  = parseInt(myMatches[3]);
      var map = {
        "January"   : 0,
        "February"  : 1,
        "March"     : 2,
        "April"     : 3,
        "May"       : 4,
        "June"      : 5,
        "July"      : 6,
        "August"    : 7,
        "September" : 8,
        "October"   : 9,
        "November"  : 10,
        "December"  : 11,
      }
      if(map.hasOwnProperty(month)) //check that month name exists
      {
        month = map[month]; // getting index for month
        // Date constructor takes month in [0-11], but day in [1-31]
        var date = new Date(year, month, day)
        if(date.getMonth() == month)//avoid February 32, March 0 and so on
        {
          obj.unix    = date / 1000;
          obj.natural = strftime('%B %Y, %-d', date);
        }

      }

    }
    
    return JSON.stringify(obj);
  }
}