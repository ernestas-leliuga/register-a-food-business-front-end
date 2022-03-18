/**
 * The new router stores the local council string in the session and renders the requested page.
 * Routes: /new/:lc, /new/:lc/:page
 * @module routers/new
 */
const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const { logger } = require("../services/winston");

const { LC_CACHE_TIME_TO_LIVE } = require("../config");
const {
  transformAnswersForSummary
} = require("../services/data-transform.service");
const {
  getPathConfigByVersion,
  getLocalCouncils,
  getCouncilData
} = require("../connectors/config-db/config-db.connector");
const {
  REGISTRATION_DATA_VERSION,
  MAINTENANCE_MODE_BLOCK_NEW,
  MAINTENANCE_MODE_BLOCK_ALL
} = require("../config");
const { Cache } = require("../services/cache.service");
const { getBrowserInfo } = require("../services/browser-support.service");
const PropsGenerator = require("../propsGenerator");

let allowedCouncils = null;

const allowedCouncilsCache = Cache(
  LC_CACHE_TIME_TO_LIVE,
  false,
  true,
  getLocalCouncils
);

const newRouter = () => {
  const router = Router();

  if (MAINTENANCE_MODE_BLOCK_ALL === "true") {
    router.get("*", (req, res) => {
      logEmitter.emit(
        "functionSuccessWith",
        "Routes",
        "/* route",
        "Maintenance Mode (Block All Users) Active. Rendering page: /maintenance"
      );
      res.render("maintenance");
    });
  }

  router.get("/:lc/:page?", async (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/new route");
    allowedCouncils = await allowedCouncilsCache.get();

    // Check that the council is supported
    if (allowedCouncils.includes(req.params.lc)) {
      const page = req.params.page || "index";

      // If the requested page is the homepage, regenerate the session before rendering.
      // (This wipes the user's data, allowing for a clean slate in the new registration)
      if (page === "index") {
        req.session.regenerate(async () => {
          req.session.council = req.params.lc;
          req.session.pathConfig = await getPathConfigByVersion(
            REGISTRATION_DATA_VERSION
          );
          const browserInfo = getBrowserInfo(req.headers["user-agent"]);
          Object.assign(req.session, req.session, { ...browserInfo });
          const { country, local_council } = await getCouncilData(
            req.params.lc
          );
          Object.assign(req.session, { country }, { lcName: local_council });

          if (MAINTENANCE_MODE_BLOCK_NEW === "true") {
            logEmitter.emit(
              "functionSuccessWith",
              "Routes",
              "/new route",
              "Maintenance Mode (Block New Users) Active. Rendering page: /maintenance"
            );
            res.render("maintenance");
          } else {
            logEmitter.emit(
              "functionSuccessWith",
              "Routes",
              "/new route",
              "Session regenerated. Rendering page: /index"
            );

            var props = PropsGenerator(req);
            logger.info(`Index passed CSRF: ${props.csrfToken}`);
            res.render("index", { props });
          }
        });
      } else {
        // Save council to session if not yet there
        if (!req.session.council) {
          req.session.council = req.params.lc;
        }
        // Save the path config to the session if not yet there
        if (!req.session.pathConfig) {
          req.session.pathConfig = await getPathConfigByVersion(
            REGISTRATION_DATA_VERSION
          );
        }
        // Save the browser support to the session if not there yet
        if (!req.session.isBrowserSupported) {
          const browserInfo = getBrowserInfo(req.headers["user-agent"]);
          Object.assign(req.session, req.session, { ...browserInfo });
        }
        // Save the country and council name to session if not yet there
        if (!req.session.country) {
          const { country, local_council } = await getCouncilData(
            req.params.lc
          );
          Object.assign(req.session, { country }, { lcName: local_council });
        }
        // Transform the data into summary format on pages where it is required and save to session
        if (
          page === "registration-summary" ||
          page === "summary-confirmation"
        ) {
          req.session.transformedData = transformAnswersForSummary(
            req.session.cumulativeFullAnswers,
            req.session.addressLookups
          );

          req.session.save(() => {
            logEmitter.emit(
              "functionSuccessWith",
              "Routes",
              "/new route",
              `Rendering page: ${page}`
            );

            let props = PropsGenerator(req);
            logger.info(`Reg or summary page passed CSRF: ${props.csrfToken}`);
            res.render(`${page}`, { props: props });
          });
          // For all other scenarios, render the requested page.
        } else {
          logEmitter.emit(
            "functionSuccessWith",
            "Routes",
            "/new route",
            `Rendering page: ${page}`
          );
          let props = PropsGenerator(req);
          logger.info(`Page passed CSRF: ${props.csrfToken}`);
          res.render(`${page}`, { props: PropsGenerator(req) });
        }
      }
    } else {
      logEmitter.emit(
        "functionSuccessWith",
        "Routes",
        "/new route",
        `Unsupported council: "${req.params.lc}". Rendering error page.`
      );
      res.render("unsupported-council");
    }
  });

  return router;
};

module.exports = { newRouter };
