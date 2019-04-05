import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick
} from "../src/components";
import { Header, Radio, MultiChoice } from "govuk-react";
import PropTypes from "prop-types";

const RadioArray = props => {
  let output = [];
  const partners = props.cumulativeFullAnswers.partners;

  for (let id in partners) {
    output.push(
      <Radio
        name="partner"
        value={partners[id]}
        id={partners[id]}
        key={id}
        defaultChecked={
          props.cumulativeFullAnswers.primary_partner === partners[id]
        }
      >
        {partners[id]}
      </Radio>
    );
  }
  return output;
};

const PrimaryPartner = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={1} size="LARGE">
      Who is the primary partner?
    </Header>

    <form action={props.formAction} method="post">
      <ContentItem.B_45_30>
        <MultiChoice
          label=""
          meta={{
            touched: true,
            error: props.validatorErrors.partner_primary
          }}
        >
          {RadioArray(props)}
        </MultiChoice>
      </ContentItem.B_45_30>

      <ContinueButton {...props} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(PrimaryPartner);

PrimaryPartner.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.array),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
