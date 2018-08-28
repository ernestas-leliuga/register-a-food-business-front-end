jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));
jest.mock("../controllers/back.controller");
const backController = require("../controllers/back.controller");
const { backRouter } = require("./back.route");

describe("Back route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = backRouter();
  });

  describe("GET to /back/:originator", () => {
    let req, res;

    beforeEach(() => {
      backController.mockImplementation(() => "/previousPage");
      handler = router.get.mock.calls[0][1];

      req = {
        session: {
          cumulativeAnswers: {},
          council: "council"
        },
        params: {
          originator: "originator"
        }
      };

      res = {
        redirect: jest.fn()
      };

      handler(req, res);
    });

    it("Should call backController with currentPage, cumulativeAnswers", () => {
      expect(backController).toHaveBeenCalledWith("/originator", {});
    });

    it("Should redirect to previous page", () => {
      expect(res.redirect).toBeCalledWith("/new/council/previousPage");
    });
  });
});