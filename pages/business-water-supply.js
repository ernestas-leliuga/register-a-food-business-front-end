import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible,
  PostForm
} from "../src/components";
import { Fieldset, Radio, MultiChoice, HintText, Paragraph } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const WaterSupply = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} t={props.t} />
    <ProcessedErrorSummary
      t={props.t}
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_45_30>
        <Fieldset>
          <Fieldset.Legend
            size="LARGE"
            isPageHeading
            style={{ marginBottom: "30px" }}
          >
            {props.t("What type of water supply does this establishment use?")}
          </Fieldset.Legend>
          <HiddenTextAccessible
            t={props.t}
            summary={props.t("What is an establishment?")}
          >
            <Paragraph mb={0}>
              {props.t(
                "An establishment is the location of your food business, and the food activities taking place there. If it is a mobile food business, please use the location where it is normally stored overnight."
              )}
            </Paragraph>
          </HiddenTextAccessible>
          <ContentItem.B_30_15>
            <HintText>
              {props.t(
                "The water supply is where you get your tap water from. It has a private water supply if it uses water that you take up from the ground by yourself. For example from a well."
              )}
            </HintText>
          </ContentItem.B_30_15>
          <MultiChoice
            label=""
            meta={{
              touched: true,
              error: props.validatorErrors.water_supply
            }}
          >
            <Radio
              name="water_supply"
              value="Public"
              id="water_supply_public"
              defaultChecked={
                props.cumulativeFullAnswers.water_supply === "Public"
              }
            >
              {props.t("Mains water supply (most common supply)")}
            </Radio>
            <Radio
              name="water_supply"
              value="Private"
              id="water_supply_private"
              defaultChecked={
                props.cumulativeFullAnswers.water_supply === "Private"
              }
            >
              {props.t("Private water supply")}
            </Radio>
            <Radio
              name="water_supply"
              value="Public and private"
              id="water_supply_public_and_private"
              defaultChecked={
                props.cumulativeFullAnswers.water_supply ===
                "Public and private"
              }
            >
              {props.t("Both mains and private water supplies")}
            </Radio>
          </MultiChoice>
        </Fieldset>
      </ContentItem.B_45_30>
      <ContentItem.B_30_15>
        <HiddenTextAccessible
          id="hiddenTextWaterSupply"
          summary={props.t("I don't know if I have a private water supply")}
        >
          <span>
            {props.t(
              "If you are not registered with a water supply company or paying a bill for water, this is an indication that your water supply could be private."
            )}
          </span>
        </HiddenTextAccessible>
      </ContentItem.B_30_15>
      <ContinueButton {...props} t={props.t} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("SessionWrapper(WaterSupply)")(
  SessionWrapper(WaterSupply)
);

WaterSupply.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
