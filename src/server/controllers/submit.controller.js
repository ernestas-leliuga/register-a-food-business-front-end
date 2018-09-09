const { submit } = require("../services/submit.service");
const { logEmitter } = require("../services/logging.service");
const { statusEmitter } = require("../services/statusEmitter.service");
const {
  transformAnswersForSubmit
} = require("../services/data-transform.service");

const submitController = async (lcUrl, submissionData, addressLookups) => {
  const controllerResponse = {
    redirectRoute: null,
    submissionDate: "",
    fsaRegistrationNumber: "",
    email_fbo: {},
    lc_details: {}
  };
  logEmitter.emit("functionCall", "submit.controller", "submitController");

  try {
    if (
      submissionData &&
      Object.getOwnPropertyNames(submissionData).length > 0
    ) {
      const transformedData = transformAnswersForSubmit(
        lcUrl,
        submissionData,
        addressLookups
      );
      const response = await submit(transformedData);
      const res = await response.json();

      if (response.status === 200) {
        controllerResponse.redirectRoute = "/summary-confirmation";
        controllerResponse.submissionDate = res.reg_submission_date;
        controllerResponse.fsaRegistrationNumber = res["fsa-rn"];
        controllerResponse.email_fbo = res.email_fbo;
        controllerResponse.lc_config = res.lc_config;
        statusEmitter.emit("incrementCount", "submissionsSucceeded");
        statusEmitter.emit("setStatus", "mostRecentSubmitSucceeded", true);
      } else {
        controllerResponse.redirectRoute = "back";
        statusEmitter.emit("incrementCount", "submissionsFailed");
        statusEmitter.emit("setStatus", "mostRecentSubmitSucceeded", false);
      }
    } else {
      throw new Error(
        "/submit route was called with an empty submission data object"
      );
    }

    logEmitter.emit(
      "functionSuccessWith",
      "submit.controller",
      "submitController",
      `
      redirectRoute: ${controllerResponse.redirectRoute}.
      submissionDate: ${controllerResponse.submissionDate}.
      fsa-rn: ${controllerResponse.fsaRegistrationNumber}.
      lc_config: ${controllerResponse.lc_config}.
      `
    );
    return controllerResponse;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "submit.controller",
      "submitController",
      err
    );
    throw err;
  }
};

module.exports = submitController;
