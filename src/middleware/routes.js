//DEFAULT ROUTER-----------------------------------------------------------
const apiRouter = require("../routes");


//UPLOAD  ROUTERS-------------------------------------------------------
const {
  getNews,
} = require("../routes/news");




module.exports = function (app) {
  app.use(apiRouter);
  app.use(
    getNews,
  );
};

