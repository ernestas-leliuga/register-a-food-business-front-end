const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const findAddressController = require("../controllers/find-address.controller");

const findAddressRouter = () => {
  const router = Router();

  router.post("/:originator", async (req, res) => {
    logEmitter.emit(
      "functionCall",
      "Routers",
      "/findaddress/:originator route"
    );

    const response = await findAddressController(
      `/${req.params.originator}`,
      req.session.cumulativeAnswers,
      req.body
    );

    req.session.cumulativeAnswers = response.cumulativeAnswers;
    req.session.validatorErrors = response.validatorErrors;

    req.session.addressLookups = Object.assign(
      {},
      req.session.addressLookups,
      response.addressLookups
    );

    req.session.switches = Object.assign(
      {},
      req.session.switches,
      response.switches
    );

    logEmitter.emit(
      "functionSuccess",
      "Routers",
      "/findaddress/:originator route"
    );
    res.redirect(`/new/${req.session.council}${response.redirectRoute}`);
  });

  return router;
};

module.exports = { findAddressRouter };
