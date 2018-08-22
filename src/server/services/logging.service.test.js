jest.mock("winston", () => ({
  info: jest.fn(),
  error: jest.fn()
}));
const { info, error } = require("winston");
const { logEmitter } = require("./logging.service");

jest.unmock("./logging.service");

describe("logEmitter", () => {
  describe("on functionCall event", () => {
    it("should call winston info", () => {
      logEmitter.emit("functionCall");
      expect(info).toBeCalled();
    });
  });

  describe("on functionCallWith event", () => {
    it("should call winston info", () => {
      logEmitter.emit("functionCallWith");
      expect(info).toBeCalled();
    });
  });

  describe("on functionSuccess event", () => {
    it("should call winston info", () => {
      logEmitter.emit("functionSuccess");
      expect(info).toBeCalled();
    });
  });

  describe("on functionSuccessWith event", () => {
    it("should call winston info", () => {
      logEmitter.emit("functionSuccessWith");
      expect(info).toBeCalled();
    });
  });

  describe("on functionFail event", () => {
    it("should call winston error", () => {
      logEmitter.emit("functionFail");
      expect(error).toBeCalled();
    });
  });

  describe("on doubleMode event", () => {
    it("should call winston info", () => {
      logEmitter.emit("doubleMode");
      expect(info).toBeCalled();
    });
  });
});