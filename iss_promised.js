const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};


/* 
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

//fetchCoordsByIP({"ip":"70.79.167.87"})

const fetchISSFlyOverTimes = (coords) => {
  const coordsObject = JSON.parse(coords);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${coordsObject.latitude}&lon=${coordsObject.longitude}`);
};

const nextISSTimesForMyLocation = () =>{
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(output => {
    const { response } = JSON.parse(output);
    return response;
  });
}

// nextISSTimesForMyLocation();


module.exports = { nextISSTimesForMyLocation }