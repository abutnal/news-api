const express = require('express');
const news = require('../../controllers/news/getNews')
const router = express.Router();
const { check, validationResult } = require('express-validator');
router.get(`/api/get-news/:keyword`,
  async (req, res, next) => {
    try {
      // validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return __validationError(req, res, errors)
      }
      else {
        let results = await news.get_news(req.query);
        if (results) {
          return __successResponse(req, res, results, 'news details');
        }  else{
          let errors = {
            errors: [
              {
                value: "",
                msg: "form not found",
                param: "",
                location: "params",
              },
            ],
          };
          return __validationError(req, res, errors);
        }
      }

    } catch (error) {
      return __unauthorized(req, res, error)
    }
  })


module.exports = router
