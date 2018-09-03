import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  SummaryTable
} from "../src/components";
import { Header, HintText } from "govuk-react";
import PropTypes from "prop-types";
import { transformAnswersForSummary } from "../src/server/services/data-transform.service";

const RegistrationSummary = props => {
  const transformedData = transformAnswersForSummary(
    props.cumulativeAnswers,
    props.addressLookups
  );

  return (
    <FsaLayout {...props}>
      <BackButton editMode={props.editMode} originator="registration-summary" />
      <ContentItem.B_30_15>
        <Header level={2}>Check your answers</Header>
        <HintText>You must check your answers before you continue</HintText>
      </ContentItem.B_30_15>
      <ContentItem.B_30_15>
        <SummaryTable {...transformedData} />
      </ContentItem.B_30_15>

      <form action="/continue/registration-summary" method="post">
        <ContinueButton />
      </form>
    </FsaLayout>
  );
};

export default SessionWrapper(RegistrationSummary);

RegistrationSummary.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string)
};
