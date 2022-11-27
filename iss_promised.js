const request = require('request-promise-native');


// fetch IP adress from API using request function
// return promise that is returned by request
const fetchMyIP = function() {
    return request('https://api.ipify.org?format=json');
};

// makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
// input: JSON string containing IP address
// Returns: Promise of request for lat/lon
const fetchCoordsByIP = function(body) {
    const ip = JSON.parse(body).ip;
    return request(`http://ipwho.is/${ip}`);
  };

// Requests data from https://iss-flyover.herokuapp.com using provided lat/long data
// Input: JSON body containing geo data response from ipwho.is
// Returns: Promise of request for fly over data, returned as JSON string
const fetchISSFlyOverTimes = function(body) {
    const { latitude, longitude } = JSON.parse(body);
    const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
    return request(url);
  };

//Returns: Promise for fly over data for users location
const nextISSTimesForMyLocation = function() {
    return fetchMyIP()
      .then(fetchCoordsByIP)
      .then(fetchISSFlyOverTimes)
      .then((data) => {
        const { response } = JSON.parse(data);
        return response;
      })
      .catch((error) => {
        console.log("It didn't work: ", error.message);
      });
  };
  
  module.exports = { nextISSTimesForMyLocation };