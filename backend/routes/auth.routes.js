const { verifySignUp, authJwt } = require("../middlewares");
const userController = require("../controllers/user.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user/signup", verifySignUp.checkDuplicateUsernameOrEmail,userController.signup);
  app.post("/api/user/signin", userController.signin);
  app.get("/api/user/:ip/getGeoInfo", authJwt.verifyToken,userController.getGeoInfo);

};