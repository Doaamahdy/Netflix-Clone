const axios = require("axios");
const enVars = require("./../config/enVars");

const fetchTMDBMovies = async (url) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${enVars.API_TOKEN}`,
    },
  };

  const response = await axios.get(url, options);
  if (response.status !== 200) {
    throw new Error("Failed to fetch data from TMDB " + response.statusText);
  }
  return response.data;
};

module.exports = {
  fetchTMDBMovies,
};
