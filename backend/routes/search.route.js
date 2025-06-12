const express = require("express");
const router = express.Router();

const {
  searchPerson,
  searchMovie,
  searchTv,
  getSearchHistory,
  removeItemFromSearchHistory
} = require("../controllers/searchController");

router.get("/person/:query", searchPerson);
router.get("/tv/:query", searchTv);
router.get("/movie/:query", searchMovie);

router.get("/history", getSearchHistory);
router.delete("/history/:id",removeItemFromSearchHistory);

module.exports = router;
