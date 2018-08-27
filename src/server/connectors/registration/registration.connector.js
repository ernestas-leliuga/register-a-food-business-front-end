const fetch = require("node-fetch");
const { SUBMIT_URL, API_SECRET, CLIENT_NAME } = require("../../config");
const { logEmitter } = require("../../services/logging.service");
const { registrationDouble } = require("./registration.double");

const sendRequest = async body => {
  const DOUBLE_MODE = process.env.DOUBLE_MODE;
  try {
    let res;
    if (DOUBLE_MODE === "true") {
      logEmitter.emit("doubleMode", "registration.connector", "sendRequest");
      res = registrationDouble(body);
    } else {
      logEmitter.emit(
        "functionCallWith",
        "registration.connector",
        "sendRequest",
        SUBMIT_URL
      );
      const headers = {
        "Content-Type": "application/json",
        "api-secret": API_SECRET,
        "client-name": CLIENT_NAME
      };
      res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers,
        body
      });
    }
    logEmitter.emit("functionSuccess", "registration.connector", "sendRequest");
    return res;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "registration.connector",
      "sendRequest",
      err
    );
    return err;
  }
};

module.exports = { sendRequest };
