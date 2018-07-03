const { Router } = require("express");
const { handle } = require("./next");
const { info } = require("winston");
const { QA_KEY } = require("./config");

const continueController = require("./controllers/continue.controller");
const submitController = require("./controllers/submit.controller");
const backController = require("./controllers/back.controller");

module.exports = () => {
  const router = Router();

  router.post("/continue/:originator", (req, res) => {
    info(`Routes: /continue route called`);
    const response = continueController(
      `/${req.params.originator}`,
      req.session.cumulativeAnswers,
      req.body
    );

    req.session.cumulativeAnswers = response.cumulativeAnswers;
    req.session.validatorErrors = response.validatorErrors;
    info(
      `Routes: /continue route finished with route ${response.redirectRoute}`
    );
    res.redirect(response.redirectRoute);
  });

  router.get("/back/:originator", (req, res) => {
    info(`Routes: /back route called`);
    const response = backController(
      `/${req.params.originator}`,
      req.session.cumulativeAnswers
    );
    info(`Routes: /back route finished with route ${response.redirectRoute}`);
    res.redirect(response);
  });

  router.get("/submit", async (req, res) => {
    info(`Routes: /submit route called`);
    const response = await submitController(req.session.cumulativeAnswers);
    info(`Routes: /submit route finished with route ${response.redirectRoute}`);
    res.redirect(response.redirectRoute);
  });

  router.get("/qa/:target", (req, res) => {
    if (req.query.QA_KEY && req.query.QA_KEY === QA_KEY) {
      const target = req.params.target;
      delete req.query.QA_KEY;
      req.session.cumulativeAnswers = req.query;
      res.redirect(`/${target}`);
    } else {
      res.status(403);
      res.send("Not permitted");
    }
  });

  router.get("*", (req, res) => {
    handle(req, res);
  });

  return router;
};
