const express = require('express');
const router = express.Router();
const {
    getSimilarTVShows,
    getTVShowDetails,
    getTVShowsByCategory,
    getTVShowTrailers,
    getTrendingTVShow
} = require('../controllers/tvController')

router.get("/trending",getTrendingTVShow );
router.get("/:id/trailers", getTVShowTrailers);
router.get("/:id/details", getTVShowDetails);
router.get("/:id/similar", getSimilarTVShows);
router.get("/:category", getTVShowsByCategory);


module.exports = router