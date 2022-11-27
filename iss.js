const request = require('request');


// Fetch our IP Address

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;

    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};
  


// Fetch the geo coordinates (Latitude & Longtitude) by IP

const fetchCoordsByIP = (ip, callback) => {

  request(`http://ipwho.is/${ip}`, (error, response, body) => {

    if (error) return callback(error, null);


    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    
    const { latitude, longitude } = JSON.parse(body);

    callback(null, {latitude, longitude});

  });
};

const fetchISSFlyOverTimes = function(coords, callback) {

  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
  }
  const passes = JSON.parse(body).response;
  callback(null, passes);
});
};


module.exports = { fetchISSFlyOverTimes };