jest.mock("../services/data-transform.service");
jest.mock("../services/submit.service");

const {
  transformAnswersForSubmit
} = require("../services/data-transform.service");
const { submit } = require("../services/submit.service");

const submitController = require("./submit.controller");

const testLcUrl = "example-lc";
const testSubmissionData = { some: "data" };
const testAddressLookups = {};

const submitArgs = [testLcUrl, testSubmissionData, testAddressLookups];

let response;

describe("Function: submitController: ", () => {
  beforeEach(() => {
    transformAnswersForSubmit.mockImplementation(() => ({
      transformedDataExample: "value"
    }));
  });

  describe("When given empty submission data", () => {
    beforeEach(async () => {
      response = await submitController(testLcUrl, {}, testAddressLookups);
    });

    it("it should return emptyData error", () => {
      expect(response.submissionErrors.emptyData).toBe(
        "/submit route was called with an empty submission data object"
      );
    });
  });

  describe("When submit returns an error", () => {
    beforeEach(async () => {
      submit.mockImplementation(() => ({
        status: "500",
        json: () => ({ reg_submission_date: "10 Jul 2018" })
      }));
      response = await submitController(...submitArgs);
    });

    it("Should set redirectRoute to back", () => {
      expect(response.redirectRoute).toBe("back");
    });
  });

  describe("When submit does NOT return an error", () => {
    beforeEach(async () => {
      submit.mockImplementation(() => ({
        status: 200,
        json: () => ({
          reg_submission_date: "10 Jul 2018",
          "fsa-rn": "D9YC4B-KFK5JE-PKR7VX",
          email_fbo: {
            success: true,
            recipient: "fbo@example.com"
          },
          lc_config: { example: "data" }
        })
      }));
      response = await submitController(...submitArgs);
    });

    it("Should set redirectRoute to summary-confirmation", () => {
      expect(response.redirectRoute).toBe("/summary-confirmation");
    });
    it("Should should return reg_submission_date", () => {
      expect(response.submissionDate).toBe("10 Jul 2018");
    });
    it("Should should return fsa_rn", () => {
      expect(response.fsaRegistrationNumber).toBe("D9YC4B-KFK5JE-PKR7VX");
    });
    it("Should should return email_fbo", () => {
      expect(response.email_fbo.recipient).toBe("fbo@example.com");
    });
    it("Should should return lc_config", () => {
      expect(response.lc_config.example).toBe("data");
    });
  });
});
