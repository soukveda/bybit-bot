const crypto = require('crypto')
const axios = require('axios');


// TESTNET API
const url='https://api-testnet.bybit.com/spot/v1/order';
var apiKey = "ENTER IN KEY";
var secret = "ENTER IN SECRET";


/**
 * Different params for different types of orders
 */
// var params = {
// 	"symbol":"ETHBTC",
// 	"side":"Buy",
// 	"qty":"0.001",
// 	"price":"90000",
// 	"type":"Limit",
// 	"timestamp":timestamp,
// 	"api_key" : apiKey,
// 	"timeInForce":"GTC"
// };

// var params = {
// 	"symbol":"BTCUSDT",
// 	"side":"Buy",
// 	"qty":"0.0005",
// 	"price":"45000",
// 	"type":"Limit",
// 	"timestamp":timestamp,
// 	"api_key" : apiKey,
// 	"timeInForce":"GTC"
// };

// var params = {
// 	"symbol":"BTCUSDT",
// 	"side":"Buy",
// 	"qty":"1005",
// 	"type":"Market",
// 	"timestamp":timestamp,
// 	"api_key" : apiKey,
// 	"timeInForce":"GTC"
// };

// var params = {
//   "symbol":"KASTAUSDT",
//   "side":"Buy",
//   "qty":amount,
//   "type":"Market",
//   "timestamp":timestamp,
//   "api_key" : apiKey,
//   "timeInForce":"GTC"
// };


async function executeApi(adjustedAmount, price) {
  var timestamp = Date.now().toString();
  var params = {
  	"symbol":"ENTER TRADING PAIR",
  	"side":"Buy",
  	"qty":adjustedAmount,
	"price":price,
  	"type":"CHOOSE LIMIT OR MARKET",
  	"timestamp":timestamp,
  	"api_key" : apiKey,
  	"timeInForce":"GTC"
  };

    console.log('getting signature...');
    const paramsQueryString=getSignature(params, secret);
    console.log('executing api...');
    const response = await axios.post(url, paramsQueryString);

    return response;
}

function getSignature(parameters, secret) {
	var orderedParams = "";
	Object.keys(parameters).sort().forEach(function(key) {
	  orderedParams += key + "=" + parameters[key] + "&";
	});
	orderedParams = orderedParams.substring(0, orderedParams.length - 1);
    
    console.log('returning signature...');
	return orderedParams+'&sign='+crypto.createHmac('sha256', secret).update(orderedParams).digest('hex');
}

module.exports = { executeApi }