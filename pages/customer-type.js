import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  PostForm
} from "../src/components";
import { Heading, Checkbox, MultiChoice, Paragraph, Fieldset } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";
import { customerTypeEnum } from "@slice-and-dice/register-a-food-business-validation";

const CustomerType = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Fieldset>
    <Fieldset.Legend>
    <Heading as="h1" size="LARGE">
      {props.t("Who will this establishment supply food to?")}
    </Heading>
    </Fieldset.Legend>
    <Paragraph>{props.t("Select all that apply")}</Paragraph>

    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_45_30>
        <MultiChoice
          label=""
          meta={{
            touched: true,
            error: props.t(props.validatorErrors.customer_type)
          }}
        >
          <Checkbox
            name="supply_other"
            id="customer_type_supply_other"
            value={customerTypeEnum.OTHER_BUSINESSES.key}
            defaultChecked={props.cumulativeFullAnswers.supply_other}
          >
            {props.t(
              "The establishment will supply food to other businesses to process, sell or serve"
            )}
          </Checkbox>

          <Checkbox
            name="supply_directly"
            id="customer_type_supply_directly"
            value={customerTypeEnum.END_CONSUMER.key}
            defaultChecked={props.cumulativeFullAnswers.supply_directly}
          >
            {props.t(
              "The establishment will supply food directly to end consumers"
            )}
          </Checkbox>
        </MultiChoice>
      </ContentItem.B_45_30>

      <ContinueButton {...props} />
    </PostForm>
    </Fieldset>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(CustomerType));

CustomerType.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
