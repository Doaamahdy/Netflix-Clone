const { fetchTMDBMovies } = require("../services/tmdb.services");

const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchTMDBMovies(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    return res.status(200).json({ success: "true", content: randomMovie });
  } catch (err) {
    return res.status(500).json({
      success: "false",
      message: "Internal Server Error",
    });
  }
};

const getMovieTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchTMDBMovies(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.status(200).json({
      success: true,
      trailers: data.results,
    });
  } catch (err) {
    if (err.message.includes("404")) {
      return res.status(404).json(null);
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchTMDBMovies(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.status(200).json({
      success: true,
      content: data,
    });
  } catch (err) {
    if (err.message.includes("4040")) {
      return res.status(404).json(null);
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getSimilarMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchTMDBMovies(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (err) {
    if (err.message.includes("404")) {
      return res.status(404).json(null);
    }
    res.status.json({
      success: true,
      message: "Internal Server Error",
    });
  }
};
const getMoviesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchTMDBMovies(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (err) {
    if (err.message.includes("404")) {
      return res.status(404).json(null);
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getTrendingMovie,
  getMovieTrailers,
  getMovieDetails,
  getSimilarMovies,
  getMoviesByCategory,
};
