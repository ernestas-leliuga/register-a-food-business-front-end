const mongodb = require("mongodb");
const {
  getPathConfigByVersion,
  getLocalCouncils,
  clearPathConfigCache
} = require("./config-db.connector");
const pathConfigMock = require("../../../__mocks__/pathConfigMock.json");
const { configVersionCollectionDouble } = require("./config-db.double");

jest.mock("mongodb");
jest.mock("./config-db.double");

let result;

describe("Function: getPathConfigByVersion", () => {
  describe("given the request has not yet been run during this process (empty cache)", () => {
    describe("given the request throws an error", () => {
      beforeEach(async () => {
        process.env.DOUBLE_MODE = false;
        clearPathConfigCache();
        mongodb.MongoClient.connect.mockImplementation(() => {
          throw new Error("example mongo error");
        });

        try {
          await getPathConfigByVersion("1.0.0");
        } catch (err) {
          result = err;
        }
      });

      describe("when the error shows that the connection has failed", () => {
        it("should throw mongoConnectionError error", () => {
          expect(result.name).toBe("mongoConnectionError");
          expect(result.message).toBe("example mongo error");
        });
      });
    });

    describe("given the request returns null", () => {
      beforeEach(async () => {
        process.env.DOUBLE_MODE = false;
        clearPathConfigCache();
        mongodb.MongoClient.connect.mockImplementation(() => ({
          db: () => ({
            collection: () => ({
              findOne: () => null
            })
          })
        }));

        result = await getPathConfigByVersion("1.0.0");
      });

      it("should return null", () => {
        expect(result).toBe(null);
      });
    });

    describe("given the request is successful", () => {
      beforeEach(() => {
        process.env.DOUBLE_MODE = false;
        clearPathConfigCache();
        mongodb.MongoClient.connect.mockImplementation(() => ({
          db: () => ({
            collection: () => ({
              findOne: () => pathConfigMock
            })
          })
        }));
      });

      it("should return the data from the findOne() response", async () => {
        await expect(getPathConfigByVersion("1.0.0")).resolves.toEqual(
          pathConfigMock
        );
      });
    });

    describe("when running in double mode", () => {
      beforeEach(() => {
        process.env.DOUBLE_MODE = true;
        clearPathConfigCache();
        configVersionCollectionDouble.findOne.mockImplementation(
          () => pathConfigMock
        );
      });

      it("should resolve with the data from the double's findOne() response", async () => {
        await expect(getPathConfigByVersion("1.0.0")).resolves.toEqual(
          pathConfigMock
        );
      });
    });
  });

  describe("given the request is run more than once during this process (populated cache)", () => {
    beforeEach(() => {
      process.env.DOUBLE_MODE = false;
      mongodb.MongoClient.connect.mockClear();
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            findOne: () => pathConfigMock
          })
        })
      }));
    });

    it("returns the correct value", async () => {
      // clear the cache
      clearPathConfigCache();

      // run one request
      await expect(getPathConfigByVersion("1.0.0")).resolves.toEqual(
        pathConfigMock
      );

      // run a second request without clearing the cache
      await expect(getPathConfigByVersion("1.0.0")).resolves.toEqual(
        pathConfigMock
      );
    });

    it("does not call the mongo connection function on the second function call", async () => {
      // clear the cache
      clearPathConfigCache();

      // run one request
      await getPathConfigByVersion("1.0.0");
      expect(mongodb.MongoClient.connect).toHaveBeenCalledTimes(1);

      // run a second request without clearing the cache
      await getPathConfigByVersion("1.0.0");
      expect(mongodb.MongoClient.connect).toHaveBeenCalledTimes(1);
    });
  });
});

describe("Function: getLocalCouncils", () => {
  describe("given the request throws an error", () => {
    beforeEach(async () => {
      mongodb.MongoClient.connect.mockImplementation(() => {
        throw new Error("example mongo error");
      });

      try {
        await getLocalCouncils();
      } catch (err) {
        result = err;
      }
    });

    describe("when the error shows that the connection has failed", () => {
      it("should throw mongoConnectionError error", () => {
        expect(result.name).toBe("mongoConnectionError");
        expect(result.message).toBe("example mongo error");
      });
    });
  });

  describe("given the request returns null", () => {
    beforeEach(async () => {
      const mongoCursor = {
        project: () => {
          return {
            toArray: () => {
              return null;
            }
          };
        }
      };
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            find: () => mongoCursor
          })
        })
      }));
      try {
        await getLocalCouncils();
      } catch (err) {
        result = err;
      }
    });

    it("should throw mongoConnectionError error", () => {
      expect(result.name).toBe("mongoConnectionError");
      expect(result.message).toBe("Cannot read property 'length' of null");
    });
  });

  describe("given the request is successful", () => {
    const localCouncilsObjs = [
      { local_council_url: "cardiff" },
      { local_council_url: "the-vale-of-glamorgan" }
    ];

    const localCouncilsMock = ["cardiff", "the-vale-of-glamorgan"];

    const mongoCursor = {
      project: () => {
        return {
          toArray: () => {
            return localCouncilsObjs;
          }
        };
      }
    };

    beforeEach(() => {
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            find: () => mongoCursor
          })
        })
      }));
    });

    it("should return the array of councils", async () => {
      await expect(getLocalCouncils()).resolves.toEqual(localCouncilsMock);
    });
  });

  describe("given there are no lc configuration records", () => {
    const localCouncilsObjs = [];
    const localCouncilsMock = [];

    const mongoCursor = {
      project: () => {
        return {
          toArray: () => {
            return localCouncilsObjs;
          }
        };
      }
    };

    beforeEach(() => {
      mongodb.MongoClient.connect.mockImplementation(() => ({
        db: () => ({
          collection: () => ({
            find: () => mongoCursor
          })
        })
      }));
    });

    it("should return an empty array and not throw an exception", async () => {
      await expect(getLocalCouncils()).resolves.toEqual(localCouncilsMock);
    });
  });
});
