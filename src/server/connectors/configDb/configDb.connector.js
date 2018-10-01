const mongodb = require("mongodb");
const { pathConfigCollectionDouble } = require("./configDb.double");
const { CONFIGDB_URL } = require("../../config");
const { logEmitter } = require("../../services/logging.service");
const { statusEmitter } = require("../../services/statusEmitter.service");

let client;
let configDB;
let pathConfigCollection;

let pathConfig = null;

const establishConnectionToMongo = async () => {
  if (process.env.DOUBLE_MODE === "true") {
    logEmitter.emit(
      "doubleMode",
      "configDb.connector",
      "establishConnectionToMongo"
    );
    pathConfigCollection = pathConfigCollectionDouble;
  } else {
    client = await mongodb.MongoClient.connect(CONFIGDB_URL, {
      useNewUrlParser: true
    });

    configDB = client.db("register_a_food_business_config");

    pathConfigCollection = configDB.collection("pathConfig");
  }
};

const getPathConfigByVersion = async version => {
  logEmitter.emit(
    "functionCall",
    "configDb.connector",
    "getPathConfigByVersion"
  );

  if (pathConfig === null) {
    try {
      await establishConnectionToMongo();

      const pathConfigRecord = await pathConfigCollection.findOne({
        _id: version
      });

      pathConfig = pathConfigRecord.path;

      statusEmitter.emit("incrementCount", "getPathConfigSucceeded");
      statusEmitter.emit("setStatus", "mostRecentGetPathConfigSucceeded", true);
    } catch (err) {
      statusEmitter.emit("incrementCount", "getPathConfigFailed");
      statusEmitter.emit(
        "setStatus",
        "mostRecentGetPathConfigSucceeded",
        false
      );
      logEmitter.emit(
        "functionFail",
        "configDb.connector",
        "getPathConfigByVersion",
        err
      );

      const newError = new Error();
      newError.name = "mongoConnectionError";
      newError.message = err.message;

      throw newError;
    }
  }

  logEmitter.emit(
    "functionSuccess",
    "configDb.connector",
    "getPathConfigByVersion"
  );

  return pathConfig;
};

const clearPathConfigCache = () => {
  pathConfig = null;
  return pathConfig;
};

module.exports = { getPathConfigByVersion, clearPathConfigCache };
