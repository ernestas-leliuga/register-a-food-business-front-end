/**
 * Functions that return correct components for address pages dependent on the registration role (Partnership or Operator)
 * @module common/address-common
 */
import { ContentItem } from "../../src/components";
import { Header, HintText } from "govuk-react";
import PartnershipCommon from "./partnership-common";
import OperatorCommon from "./operator-common";

const header = role => {
  if (role === "Partnership") {
    return (
      <Header level={1} size="LARGE" id="operator-address-header">
        What is the partnership contact's address?
      </Header>
    );
  }
  return (
    <Header level={1} size="LARGE" id="operator-address-header">
      What is the operator's address?
    </Header>
  );
};

const hintText = role => {
  if (role === "Partnership") {
    return (
      <ContentItem.B_30_15>
        <HintText>
          Partnership address is the contact address for the partner who is the
          main point of contact.
        </HintText>
      </ContentItem.B_30_15>
    );
  }
  return (
    <ContentItem.B_30_15>
      <HintText>
        Operator address is the contact address for the operator. For example
        home address for a sole trader or headquarters address for a limited
        company.
      </HintText>
    </ContentItem.B_30_15>
  );
};

const extraInfo = role => {
  if (role === "Partnership") {
    return PartnershipCommon.whatIsAPartnership();
  }
  return OperatorCommon.whatIsABusinessOperator();
};

const addressCommon = role => {
  return [header(role), hintText(role), extraInfo(role)];
};
module.exports = { addressCommon };
