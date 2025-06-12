const { fetchTMDBMovies } = require("../services/tmdb.services");
const User = require("../models/user");
const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const url = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`;
    const data = await fetchTMDBMovies(url);
    console.log(data);
    if (data.results.length === 0) {
      return res.status(404).json(null);
    }
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchType: "person",
          createdAt: Date.now(),
        },
      },
    });
    return res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: err.message,
    });
  }
};

const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const data = await fetchTMDBMovies(url);
    if (data.results.length === 0) {
      return res.status(404).json(null);
    }
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].title,
          searchType: "movie",
          createdAt: Date.now(),
        },
      },
    });
    return res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
};
const searchTv = async (req, res) => {
  const { query } = req.params;
  try {
    const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;
    const data = await fetchTMDBMovies(url);
    if (data.results.length === 0) {
      return res.status(404).json(null);
    }
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].name,
          searchType: "tv",
          createdAt: Date.now(),
        },
      },
    });
    return res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
};

const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      content: req.user.searchHistory,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const removeItemFromSearchHistory = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          searchHistory: {
            id: Number(id),
          },
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Item removed from search history successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  searchPerson,
  searchMovie,
  searchTv,
  getSearchHistory,
  removeItemFromSearchHistory,
};
