import { HiddenTextAccessible } from "./";
import { Paragraph } from "govuk-react";
import { withTranslation } from "../../i18n.js";

const PartnershipDescription = (props) => (
  <HiddenTextAccessible t={props.t} summary={props.t("What is a partnership?")}>
    <Paragraph mb={0}>
      {props.t(
        "In a partnership, you and your partner (or partners) personally share responsibility for your food business"
      )}
    </Paragraph>
  </HiddenTextAccessible>
);

export default withTranslation("PartnershipDescription")(
  PartnershipDescription
);
