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
import { Heading, InputField, Paragraph, ErrorText } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const EstablishmentAddress = (props) => (
  <FsaLayout {...props}>
    <BackButton
      {...props}
      t={props.t}
      href={
        props.switches["/establishment-address-none-found"]
          ? `/new/${props.council}/establishment-address`
          : `/new/${props.council}/establishment-address-select`
      }
    />
    <ProcessedErrorSummary
      t={props.t}
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      {props.t("What is the establishment's address?")}
    </Heading>

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

    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_30_15>
        {props.switches["/establishment-address-none-found"] ? (
          <ContentItem.B_30_15>
            <ErrorText id="addressNotFoundByPostcodeMessage">
              {`${props.t("No addresses found for the postcode")} "${
                props.cumulativeFullAnswers.establishment_postcode_find
              }". ${props.t(
                "Please enter your address manually or go back to try a different postcode."
              )}`}
            </ErrorText>
          </ContentItem.B_30_15>
        ) : null}

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_address_line_1",
              defaultValue:
                props.cumulativeFullAnswers.establishment_address_line_1,
              autoComplete: "address-line1"
            }}
            id="establishment_address_line_1"
            meta={{
              touched: true,
              error: props.validatorErrors.establishment_address_line_1
            }}
          >
            {props.t("Address line 1")}
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_address_line_2",
              defaultValue:
                props.cumulativeFullAnswers.establishment_address_line_2,
              autoComplete: "address-line2"
            }}
            id="establishment_address_line_2"
            meta={{
              touched: true,
              error: props.validatorErrors.establishment_address_line_2
            }}
          >
            {props.t("Address line 2 (optional)")}
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_address_line_3",
              defaultValue:
                props.cumulativeFullAnswers.establishment_address_line_3,
              autoComplete: "address-line3"
            }}
            id="establishment_address_line_3"
            meta={{
              touched: true,
              error: props.validatorErrors.establishment_address_line_3
            }}
          >
            {props.t("Address line 3 (optional)")}
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_town",
              defaultValue: props.cumulativeFullAnswers.establishment_town,
              autoComplete: "locality"
            }}
            id="establishment_town"
            meta={{
              touched: true,
              error: props.validatorErrors.establishment_town
            }}
          >
            {props.t("Town or city")}
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_postcode",
              defaultValue: props.cumulativeFullAnswers.establishment_postcode,
              autoComplete: "postal-code"
            }}
            id="establishment_postcode"
            meta={{
              touched: true,
              error: props.validatorErrors.establishment_postcode
            }}
          >
            {props.t("Postcode")}
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton {...props} t={props.t} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("SessionWrapper(EstablishmentAddress)")(
  SessionWrapper(EstablishmentAddress)
);

EstablishmentAddress.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
