jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));
jest.mock("../next", () => ({
  Next: {
    render: jest.fn()
  }
}));

const { Next } = require("../next");
const { newRouter } = require("./new.route");

describe("New route: ", () => {
  let router, handler;
  beforeEach(() => {
    router = newRouter();
  });

  describe("GET to /new/:lc/page", () => {
    describe("When req.session.council is undefined", () => {
      let req, res;

      beforeEach(() => {
        handler = router.get.mock.calls[0][1];
        req = {
          session: {},
          params: {
            lc: "cardiff"
          }
        };

        res = "res";

        handler(req, res);
      });

      it("Should set req.session.council", () => {
        expect(req.session.council).toBe("cardiff");
      });

      it("Should call Next.render", () => {
        expect(Next.render).toBeCalled();
      });
    });

    describe("When req.session.council is defined", () => {
      let req, res;

      beforeEach(() => {
        handler = router.get.mock.calls[0][1];
        req = {
          session: {
            council: "cardiff"
          },
          params: {
            page: "new page",
            lc: "cardiff"
          }
        };

        res = "res";

        handler(req, res);
      });

      it("Should call Next.render with page", () => {
        expect(Next.render).toBeCalledWith(req, res, "/new page");
      });
    });

    describe("When req.params.page is not defined", () => {
      let req, res;

      beforeEach(() => {
        handler = router.get.mock.calls[0][1];
        req = {
          session: {
            council: "cardiff"
          },
          params: {
            lc: "cardiff"
          }
        };

        res = "res";

        handler(req, res);
      });

      it("Should call Next.render with index", () => {
        expect(Next.render).toBeCalledWith(req, res, "/index");
      });
    });

    describe("When req.params.lc is not allowed", () => {
      let req, res;

      beforeEach(() => {
        handler = router.get.mock.calls[0][1];
        req = {
          session: {
            council: "not a supported council"
          },
          params: {
            lc: "not a supported council"
          }
        };

        res = "res";

        handler(req, res);
      });

      it("Should call Next.render with unsupported-council", () => {
        expect(Next.render).toBeCalledWith(req, res, "/unsupported-council");
      });
    });
  });
});