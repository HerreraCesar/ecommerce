import { requestLogger } from "../controllers/loggers.js";

export const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    requestLogger.info(`ruta ${req.baseUrl} metodo ${req.method} autorizada`);
    next();
  } else {
    requestLogger.info(
      `ruta ${req.baseUrl} metodo ${req.method} no autorizada`
    );
    res.redirect("/users/login");
  }
};
