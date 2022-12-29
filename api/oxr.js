exports = module.exports = exports = module.exports = function() {
  var mod = {
    list: async function() {
      var result = await fetch(config.oxr.link + "/latest.json?app_id=" + config.oxr.appId, {
        method: "GET"
      });
      if (result.status === 200) {
        var json = await result.json();
        return mod.convert(json.rates, config.oxr.base, config.oxr.decimals)
      }
      console.log("Could not fetch currency list from oxr.", await result.text());
    },
    number: function(decimals) {
      if (app.has(decimals) !== true) return 1;
      var num = 10;
      for (var i=0; i<=decimals-2; i++) num *= 10;
      return num;
    },
    convert: function(rates, fromBase, decimals) {
      var rate = 1;
      var newRates = {};
      for (var base in rates) {
        if (base === fromBase) rate = rates[base];
      }
      for (var base in rates) {
        newRates[base] = Math.round(rates[base] / rate * mod.number(decimals)) / mod.number(decimals);
      }
      return newRates;
    }
  };
  return mod;
};