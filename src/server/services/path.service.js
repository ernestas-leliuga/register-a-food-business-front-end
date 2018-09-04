const pathJSON = require("../services/path.json");

const moveAlongPath = (path, currentPage, movement) => {
  logEmitter.emit("functionCall", "path.service", "moveAlongPath");

  try {
    const activePath = Object.keys(path).filter(
      entry => path[entry].on === true
    );

    const currentIndex = activePath.indexOf(currentPage);

    const nextPage = activePath[currentIndex + (movement || 0)];

    if (nextPage) {
      logEmitter.emit(
        "functionSuccessWith",
        "path.service",
        "moveAlongPath",
        `Next page in path: "${nextPage}"`
      );
      return nextPage;
    } else {
      throw new Error(`
      path.service.js moveAlongPath(): Attempt was made to move "${movement}" pages from "${currentPage}".
      This moves beyond the boundaries of the path, so the page does not exist.
      Check the routing service, path JSON, and the form action on "${currentPage}".
    `);
    }
  } catch (err) {
    logEmitter.emit("functionFail", "path.service", "moveAlongPath", err);
    throw err;
  }
};

const editPath = cumulativeAnswers => {
  logEmitter.emit("functionCall", "path.service", "editPath");

  try {
    if (!cumulativeAnswers || typeof cumulativeAnswers !== "object") {
      throw new Error(`
      path.service.js editPath(): the cumulativeAnswers argument is either missing or is not an object.
    `);
    }

    const newPath = JSON.parse(JSON.stringify(pathJSON));

    let pagesToSwitch = {};

    const allSwitches = {};
    for (let page in newPath) {
      Object.assign(allSwitches, newPath[page].switches);
    }

    const allAnswerValues = Object.values(cumulativeAnswers);
    const allAnswerKeys = [];

    for (let key in cumulativeAnswers) {
      if (cumulativeAnswers[key] !== "") {
        allAnswerKeys.push(key);
      }
    }

    const answerValuesAndTruthyKeys = allAnswerValues.concat(allAnswerKeys);

    answerValuesAndTruthyKeys.sort((a, b) => {
      return (
        Object.keys(allSwitches).indexOf(a) -
        Object.keys(allSwitches).indexOf(b)
      );
    });

    answerValuesAndTruthyKeys.forEach(valueOrKey => {
      if (allSwitches[valueOrKey]) {
        pagesToSwitch = Object.assign(pagesToSwitch, allSwitches[valueOrKey]);
      }
    });

    for (let eachPage in pagesToSwitch) {
      newPath[eachPage].on = pagesToSwitch[eachPage];
    }

    logEmitter.emit("functionSuccess", "path.service", "editPath");
    return newPath;
  } catch (err) {
    logEmitter.emit("functionFail", "path.service", "editPath", err);
    throw err;
  }
};

switchOffManualAddressInput = (newPath, currentPage) => {
  logEmitter.emit(
    "functionCall",
    "path.service",
    "switchOffManualAddressInput"
  );

  try {
    const manualAddressSwitchedPath = JSON.parse(JSON.stringify(newPath));

    if (currentPage === "/establishment-address-select") {
      manualAddressSwitchedPath["/establishment-address-manual"].on = false;
    }

    if (currentPage === "/operator-address-select") {
      manualAddressSwitchedPath["/operator-address-manual"].on = false;
    }

    logEmitter.emit(
      "functionSuccess",
      "path.service",
      "switchOffManualAddressInput"
    );
    return manualAddressSwitchedPath;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "path.service",
      "switchOffManualAddressInput",
      err
    );
    throw err;
  }
};

module.exports = { moveAlongPath, editPath, switchOffManualAddressInput };
