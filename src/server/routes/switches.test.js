jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));

jest.mock("../controllers/switches.controller");
const switchesController = require("../controllers/switches.controller");
const { switchesRouter } = require("./switches.route");

describe("Switches route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = switchesRouter();
  });

  describe("POST to /switches/:switchName/:action/:originator", () => {
    const req = {
      session: { switches: {} },
      params: {
        switchName: "exampleSwitch",
        action: "on",
        originator: "/mock-page-1"
      }
    };
    const res = {
      redirect: jest.fn()
    };

    beforeEach(() => {
      switchesController.mockImplementation(() => ({
        cumulativeAnswers: { example: "answer" },
        newSwitchState: true
      }));
      handler = router.post.mock.calls[0][1];
      handler(req, res);
    });

    it("Should redirect to the previous page", () => {
      expect(res.redirect).toBeCalledWith("back");
    });

    it("Should update session", () => {
      expect(req.session.cumulativeAnswers).toEqual({ example: "answer" });
      expect(req.session.switches).toEqual({ exampleSwitch: true });
    });

    describe("Given there is no switches object", () => {
      beforeEach(() => {
        req.session.switches = undefined;
        handler(req, res);
      });

      it("Should redirect to the previous page", () => {
        expect(res.redirect).toBeCalledWith("back");
      });
    });
  });
});
