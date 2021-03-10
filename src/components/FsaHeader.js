import { TopNav, Main, PhaseBanner } from "@slice-and-dice/govuk-react";
import asTopNavAnchor from "../hoc/asTopNavAnchor";
import styled from "@emotion/styled";
import CookieBanner from "./CookieBanner";
import BackAndLanguageBar from "./BackAndLanguageBar";
import { withTranslation } from "../../i18n.js";

const AnchorTag = asTopNavAnchor("a");

const FsaTopNav = styled(TopNav)`
  div:nth-of-type(1) {
    width: 95%;
  }

  div:nth-of-type(2) {
    width: 1%;
  }
`;

const Company = (props) => (
  <AnchorTag
    href="https://www.food.gov.uk"
    target="_blank"
    aria-label={props.t("food.gov.uk website (opens in new window)")}
    style={{
      color: "rgb(255, 255, 255)",
      textDecorationSkipInk: "none",
      fontWeight: 700,
      lineHeight: 1,
      textDecoration: "none",
      borderBottom: "1px solid transparent"
    }}
  >
    {props.t("Register a Food Business")}
  </AnchorTag>
);

const StyledHeader = styled("div")({});
const HeaderMain = styled(Main)({
  paddingTop: 3
});

const FsaHeader = (props) => (
  <StyledHeader role="banner">
    {props.acceptAllCookies === "true" ||
    props.acceptAllCookies === "false" ? null : (
      <section aria-label={props.t("cookie banner")}>
        <CookieBanner />
      </section>
    )}
    <FsaTopNav company={Company(props)} />
    <HeaderMain>
      <PhaseBanner level="beta">
        {props.t("This is a new service")} -{" "}
        <AnchorTag
          id="feedbackLink"
          href={props.t("feedback-form")}
          target="_blank"
          aria-label={props.t("your feedback (opens in new window)")}
          style={{
            color: "rgb(0, 94, 165)"
          }}
        >
          {props.t("your feedback")}
        </AnchorTag>{" "}
        {props.t("will help us improve it")}
      </PhaseBanner>
    </HeaderMain>
    <BackAndLanguageBar {...props} />
  </StyledHeader>
);

export default withTranslation("common")(FsaHeader);
