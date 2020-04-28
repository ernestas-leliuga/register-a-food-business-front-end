import React from "react";
import { Table, asAnchor } from "govuk-react";
import PropTypes from "prop-types";
import * as COLOUR from "govuk-colours";
import moment from "moment";
import styled from "react-emotion";
import ContentItem from "./ContentItem";

import {
    FONT_SIZE,
    LINE_HEIGHT,
    MEDIA_QUERIES,
    NTA_LIGHT
} from "@govuk-react/constants";

const StyledTableRow = styled("div")({
    fontFamily: NTA_LIGHT,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    fontWeight: 400,
    display: "inline-flex",
    textTransform: "none",
    fontSize: FONT_SIZE.SIZE_16,
    lineHeight: LINE_HEIGHT.SIZE_16,
    [MEDIA_QUERIES.LARGESCREEN]: {
        fontSize: FONT_SIZE.SIZE_19,
        lineHeight: LINE_HEIGHT.SIZE_19
    },
    color: `${COLOUR.GREY_1}`
});

const GridRow = styled(Table.Row)`
    display: grid;
    ${(props) =>
        props.acPage
            ? "grid-template-columns: 1fr 1fr;"
            : "grid-template-columns: 1fr 1fr 70px;"};
`;

const FsaStyledTable = styled(Table)`
    tr:nth-child(2) {
        border-top: 1px solid #bfc1c3;
        margin-top: 12px;
    }
`;

const TableCellBold = styled(Table.Cell)`
    font-weight: bold;
`;

const AccessibleTable = (props) => (
    <FsaStyledTable role="table" {...props}>
        {props.children}
    </FsaStyledTable>
);

const AccessibleTableRow = (props) => (
    <GridRow role="row" {...props}>
        {props.children}
    </GridRow>
);

const AccessibleRowHeader = (props) => (
    <Table.CellHeader scope="row" role="rowheader" {...props}>
        {props.children}
    </Table.CellHeader>
);

const applyRowHeaderStyling = (error) => {
    return error
        ? {
              style: { color: "#b10e1e" }
          }
        : null;
};

const AccessibleCell = (props) => (
    <TableCellBold role="cell" className="summaryTableDataCell" {...props}>
        {props.children}
    </TableCellBold>
);

const AccessibleChangeCell = (props) => (
    <Table.Cell role="cell" className="summaryTableChangeCell" {...props}>
        {props.children}
    </Table.Cell>
);

const InvisibleRow = styled(Table.Row)`
    color: #ffffff00;
    color: transparent;
    z-index: -1000;
    td,
    th {
        border: none;
        position: absolute;
    }
`;

const ColumnHeaders = () => (
    <InvisibleRow>
        <Table.CellHeader scope="col" role="columnheader">
            The question
        </Table.CellHeader>
        <Table.CellHeader scope="col" role="columnheader">
            Your answer
        </Table.CellHeader>
        <Table.CellHeader scope="col" role="columnheader">
            Change your answer
        </Table.CellHeader>
    </InvisibleRow>
);

const AnchorTag = asAnchor("a");

const determineLinkText = (property) => {
    return property ? "Change" : "Enter answer";
};

const OperatorDetailsTable = (props) => (
    <React.Fragment>
        <ColumnHeaders />
        {props.operator_type || props.validatorErrors["operator_type"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="operatorTypeRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["operator_type"]
                    )}
                >
                    Operator type
                </AccessibleRowHeader>
                <AccessibleCell id="operator_type">
                    {props.operator_type}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeOperatorTypeRow"
                            href="/edit/registration-role"
                            aria-label="Change operator type"
                        >
                            {determineLinkText(props.operator_type)}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.operator_company_name ||
        props.validatorErrors["operator_company_name"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="operatorCompanyNameRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["operator_company_name"]
                    )}
                >
                    Company name
                </AccessibleRowHeader>
                <AccessibleCell id="operator_company_name">
                    {props.operator_company_name}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeOperatorCompanyNameRow"
                            href="/edit/operator-company-details"
                            aria-label="Change operator company name"
                        >
                            {determineLinkText(props.operator_company_name)}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.operator_companies_house_number ||
        props.validatorErrors["operator_companies_house_number"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="operatorCompaniesHouseRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["operator_companies_house_number"]
                    )}
                >
                    Companies House number
                </AccessibleRowHeader>
                <AccessibleCell id="operator_companies_house_number">
                    {props.operator_companies_house_number}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeOperatorCompaniesHouseRow"
                            href="/edit/operator-company-details"
                            aria-label="Change operator companies house"
                        >
                            {determineLinkText(
                                props.operator_companies_house_number
                            )}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.operator_charity_name ||
        props.validatorErrors["operator_charity_name"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="operatorCharityNameRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["operator_charity_name"]
                    )}
                >
                    Charity name
                </AccessibleRowHeader>
                <AccessibleCell id="operator_charity_name">
                    {props.operator_charity_name}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeOperatorCharityNameRow"
                            href="/edit/operator-charity-details"
                            aria-label="Change operator charity name"
                        >
                            {determineLinkText(props.operator_charity_name)}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.operator_charity_number ||
        props.validatorErrors["operator_charity_number"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="operatorCharityNumberRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["operator_charity_number"]
                    )}
                >
                    Charity number
                </AccessibleRowHeader>
                <AccessibleCell id="operator_charity_number">
                    {props.operator_charity_number}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeOperatorCharityNumberRow"
                            href="/edit/operator-charity-details"
                            aria-label="Change operator charity number"
                        >
                            {determineLinkText(props.operator_charity_number)}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.operator_first_name ||
        props.operator_last_name ||
        props.validatorErrors["operator_first_name"] ||
        props.validatorErrors["operator_last_name"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="operatorNameRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["operator_first_name"] ||
                            props.validatorErrors["operator_last_name"]
                    )}
                >
                    Name
                </AccessibleRowHeader>
                <AccessibleCell>
                    <span id="operator_first_name">
                        {props.operator_first_name}
                    </span>{" "}
                    <span id="operator_last_name">
                        {props.operator_last_name}
                    </span>
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeOperatorNameRow"
                            href="/edit/operator-name"
                            aria-label="Change operator name"
                        >
                            {determineLinkText(
                                props.operator_first_name &&
                                    props.operator_last_name
                            )}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.operator_address_line_1 ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="operatorAddressRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["operator_first_line"] ||
                            props.validatorErrors["operator_street"] ||
                            props.validatorErrors["operator_town"] ||
                            props.validatorErrors["operator_postcode"] ||
                            props.validatorErrors["operator_postcode_find"]
                    )}
                >
                    {props.operator_type === "Partnership"
                        ? "Partnership contact address"
                        : "Operator address"}
                </AccessibleRowHeader>
                <AccessibleCell>
                    <div id="operator_address_line_1">
                        {props.operator_address_line_1}
                    </div>
                    <div id="operator_address_line_2">
                        {props.operator_address_line_2 || null}
                    </div>
                    <div id="operator_address_line_3">
                        {props.operator_address_line_3 || null}
                    </div>
                    <div id="operator_town">{props.operator_town}</div>
                    <div id="operator_postcode">{props.operator_postcode}</div>
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleCell>
                        <div />
                    </AccessibleCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.operator_primary_number ||
        props.validatorErrors["operator_primary_number"] ||
        props.validatorErrors["operator_secondary_number"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="operatorContactDetailsRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["operator_primary_number"] ||
                            props.validatorErrors["operator_secondary_number"]
                    )}
                >
                    Phone number
                </AccessibleRowHeader>
                <AccessibleCell>
                    <div id="operator_primary_number">
                        {props.operator_primary_number}
                    </div>
                    <div id="operator_secondary_number">
                        {props.operator_secondary_number || null}
                    </div>
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeOperatorContactDetailsRow"
                            href="/edit/operator-contact-details"
                            aria-label="Change operator contact details"
                        >
                            {determineLinkText(props.operator_primary_number)}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.operator_email || props.validatorErrors["operator_email"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="operatorEmailRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["operator_email"]
                    )}
                >
                    Email address
                </AccessibleRowHeader>
                <AccessibleCell id="operator_email">
                    {props.operator_email}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeOperatorEmailRow"
                            href="/edit/operator-contact-details"
                            aria-label="Change operator email"
                        >
                            {determineLinkText(props.operator_email)}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.partners || props.validatorErrors["partners"] ? (
            <React.Fragment>
                <AccessibleTableRow
                    acPage={props.applicationCompletePage}
                    id="mainPartnershipContactRow"
                >
                    <AccessibleRowHeader
                        {...applyRowHeaderStyling(
                            props.validatorErrors["main_partnership_contact"]
                        )}
                    >
                        Main partnership contact
                    </AccessibleRowHeader>
                    <AccessibleCell id="main_partnership_contact">
                        {props.main_partnership_contact}
                    </AccessibleCell>
                    {props.applicationCompletePage ? null : (
                        <AccessibleChangeCell>
                            <AnchorTag
                                id="changeMainPartnershipContactRow"
                                href="/edit/main-partnership-contact"
                                aria-label="Change main partnership contact"
                            >
                                Change
                            </AnchorTag>
                        </AccessibleChangeCell>
                    )}
                </AccessibleTableRow>
                <AccessibleTableRow
                    acPage={props.applicationCompletePage}
                    id="operatorPartnersRow"
                >
                    <AccessibleRowHeader
                        {...applyRowHeaderStyling(
                            props.validatorErrors["partners"]
                        )}
                    >
                        Partners
                    </AccessibleRowHeader>
                    <AccessibleCell id="partners">
                        {props.partners.map((partner, index) => {
                            return (
                                <div key={`partner_${index}`}>{partner}</div>
                            );
                        })}
                    </AccessibleCell>
                    {props.applicationCompletePage ? null : (
                        <AccessibleChangeCell>
                            <AnchorTag
                                id="changeOperatorPartnersRow"
                                href="/edit/partner-name"
                                aria-label="Change partner details"
                            >
                                Change
                            </AnchorTag>
                        </AccessibleChangeCell>
                    )}
                </AccessibleTableRow>
            </React.Fragment>
        ) : null}

        {props.contact_representative_name ||
        props.contact_representative_role ||
        props.contact_representative_number ||
        props.contact_representative_email ||
        props.validatorErrors["contact_representative_name"] ||
        props.validatorErrors["contact_representative_role"] ||
        props.validatorErrors["contact_representative_number"] ||
        props.validatorErrors["contact_representative_email"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="contactRepresentativeRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["contact_representative_name"] ||
                            props.validatorErrors[
                                "contact_representative_role"
                            ] ||
                            props.validatorErrors[
                                "contact_representative_number"
                            ] ||
                            props.validatorErrors[
                                "contact_representative_email"
                            ]
                    )}
                >
                    Designated contact
                </AccessibleRowHeader>
                <AccessibleCell>
                    <StyledTableRow>
                        <div id="contact_representative_name">
                            {props.contact_representative_name}
                        </div>
                    </StyledTableRow>
                    <StyledTableRow>
                        <div id="contact_representative_role">
                            {props.contact_representative_role
                                ? `\u2000\u2022 ${props.contact_representative_role}`
                                : null}
                        </div>
                    </StyledTableRow>
                    <div id="contact_representative_number">
                        {props.contact_representative_number}
                    </div>
                    <div id="contact_representative_email">
                        {props.contact_representative_email}
                    </div>
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeContactRepresentativeRow"
                            href="/edit/contact-representative"
                            aria-label="Change contact representative"
                        >
                            {determineLinkText(
                                props.contact_representative_name
                            )}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}
    </React.Fragment>
);

const EstablishmentDetailsTable = (props) => (
    <React.Fragment>
        <ColumnHeaders />
        {props.establishment_trading_name ||
        props.validatorErrors["establishment_trading_name"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="establishmentTradingNameRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["establishment_trading_name"]
                    )}
                >
                    Trading name
                </AccessibleRowHeader>
                <AccessibleCell id="establishment_trading_name">
                    {props.establishment_trading_name}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeEstablishmentTradingNameRow"
                            href="/edit/establishment-trading-name"
                            aria-label="Change establishment trading name"
                        >
                            {determineLinkText(
                                props.establishment_trading_name
                            )}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.establishment_address_line_1 ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="establishmentAddressRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["establishment_first_line"] ||
                            props.validatorErrors["establishment_street"] ||
                            props.validatorErrors["establishment_town"] ||
                            props.validatorErrors["establishment_postcode"] ||
                            props.validatorErrors["establishment_postcode_find"]
                    )}
                >
                    Establishment address
                </AccessibleRowHeader>
                <AccessibleCell>
                    <div id="establishment_address_line_1">
                        {props.establishment_address_line_1}
                    </div>
                    <div id="establishment_address_line_2">
                        {props.establishment_address_line_2 || null}
                    </div>
                    <div id="establishment_address_line_3">
                        {props.establishment_address_line_3 || null}
                    </div>
                    <div id="establishment_town">
                        {props.establishment_town}
                    </div>
                    <div id="establishment_postcode">
                        {props.establishment_postcode}
                    </div>
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleCell>
                        <AnchorTag>
                            <div />
                        </AnchorTag>
                    </AccessibleCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.establishment_type ||
        props.validatorErrors["establishment_type"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="establishmentAddressTypeRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["establishment_type"]
                    )}
                >
                    Address type
                </AccessibleRowHeader>
                <AccessibleCell id="establishment_type">
                    {props.establishment_type}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeEstablishmentAddressTypeRow"
                            href="/edit/establishment-address-type"
                            aria-label="Change establishment address type"
                        >
                            {determineLinkText(props.establishment_type)}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.establishment_primary_number ||
        props.validatorErrors["establishment_primary_number"] ||
        props.validatorErrors["establishment_secondary_number"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="establishmentContactDetailsRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["establishment_primary_number"] ||
                            props.validatorErrors[
                                "establishment_secondary_number"
                            ]
                    )}
                >
                    Phone number
                </AccessibleRowHeader>
                <AccessibleCell>
                    <div id="establishment_primary_number">
                        {props.establishment_primary_number}
                    </div>
                    <div id="establishment_secondary_number">
                        {props.establishment_secondary_number || null}
                    </div>
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeEstablishmentContactDetailsRow"
                            href="/edit/establishment-contact-details"
                            aria-label="Change establishment contact details"
                        >
                            {determineLinkText(
                                props.establishment_primary_number
                            )}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.establishment_email ||
        props.validatorErrors["establishment_email"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="establishmentEmailRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["establishment_email"]
                    )}
                >
                    Email address
                </AccessibleRowHeader>
                <AccessibleCell id="establishment_email">
                    {props.establishment_email}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeEstablishmentEmailRow"
                            href="/edit/establishment-contact-details"
                            aria-label="Change establishment email"
                        >
                            {determineLinkText(props.establishment_email)}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.establishment_opening_date ||
        props.validatorErrors["establishment_opening_status"] ||
        props.validatorErrors["establishment_opening_date"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="establishmentOpeningDateRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["establishment_opening_status"] ||
                            props.validatorErrors["establishment_opening_date"]
                    )}
                >
                    Trading date
                </AccessibleRowHeader>
                <AccessibleCell id="establishment_opening_date">
                    {props.establishment_opening_date
                        ? moment(props.establishment_opening_date).format(
                              "DD MMM YYYY"
                          )
                        : ""}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeEstablishmentOpeningDateRow"
                            href="/edit/establishment-opening-status"
                            aria-label="Change establishment opening date"
                        >
                            {determineLinkText(
                                moment(props.establishment_opening_date).format(
                                    "DD MMM YYYY"
                                ) !== "Invalid date" &&
                                    props.establishment_opening_date
                            )}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.opening_days_start ||
        props.opening_days_some ||
        props.opening_days_irregular ||
        props.validatorErrors["opening_days_start"] ||
        props.validatorErrors["opening_days_some"] ||
        props.validatorErrors["opening_days_irregular"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="establishmentOpeningDaysRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["opening_days_start"] ||
                            props.validatorErrors["opening_days_irregular"] ||
                            props.validatorErrors["opening_days_some"]
                    )}
                >
                    Opening days
                </AccessibleRowHeader>
                <AccessibleCell
                    id={`${
                        props.validatorErrors["opening_days_start"]
                            ? "opening_days_start"
                            : props.validatorErrors["opening_days_irregular"]
                            ? "opening_days_irregular"
                            : "opening_days_some"
                    }`}
                >
                    {props.opening_days_irregular ||
                        props.open_some_days_summary_table || (
                            <div>
                                <div id="opening_day_monday">
                                    {props.opening_day_monday}
                                </div>
                                <div id="opening_day_tuesday">
                                    {props.opening_day_tuesday}
                                </div>
                                <div id="opening_day_wednesday">
                                    {props.opening_day_wednesday}
                                </div>
                                <div id="opening_day_thursday">
                                    {props.opening_day_thursday}
                                </div>
                                <div id="opening_day_friday">
                                    {props.opening_day_friday}
                                </div>
                                <div id="opening_day_saturday">
                                    {props.opening_day_saturday}
                                </div>
                                <div id="opening_day_sunday">
                                    {props.opening_day_sunday}
                                </div>
                            </div>
                        )}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeEstablishmentOpeningDaysRow"
                            href="/edit/opening-days-start"
                            aria-label="Change establishment opening days"
                        >
                            {determineLinkText(
                                props.opening_days_irregular ||
                                    props.open_some_days_summary_table ||
                                    props.opening_day_monday ||
                                    props.opening_day_tuesday ||
                                    props.opening_day_wednesday ||
                                    props.opening_day_thursday ||
                                    props.opening_day_friday ||
                                    props.opening_day_saturday ||
                                    props.opening_day_sunday
                            )}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}
        {(props.opening_days_start &&
            props.opening_days_start !== "Irregular days") ||
        props.opening_days_some ||
        props.validatorErrors["opening_hours_monday"] ||
        props.validatorErrors["opening_hours_tuesday"] ||
        props.validatorErrors["opening_hours_wednesday"] ||
        props.validatorErrors["opening_hours_thursday"] ||
        props.validatorErrors["opening_hours_friday"] ||
        props.validatorErrors["opening_hours_saturday"] ||
        props.validatorErrors["opening_hours_sunday"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="establishmentOpeningHoursRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["opening_hours_monday"] ||
                            props.validatorErrors["opening_hours_tuesday"] ||
                            props.validatorErrors["opening_hours_wednesday"] ||
                            props.validatorErrors["opening_hours_thursday"] ||
                            props.validatorErrors["opening_hours_friday"] ||
                            props.validatorErrors["opening_hours_saturday"] ||
                            props.validatorErrors["opening_hours_sunday"]
                    )}
                >
                    Opening hours
                </AccessibleRowHeader>
                <AccessibleCell>
                    <div>
                        <div id="opening_hours_monday">
                            {props.opening_hours_monday &&
                                `Monday: ${props.opening_hours_monday}`}
                        </div>
                        <div id="opening_hours_tuesday">
                            {props.opening_hours_tuesday &&
                                `Tuesday: ${props.opening_hours_tuesday}`}
                        </div>
                        <div id="opening_hours_wednesday">
                            {props.opening_hours_wednesday &&
                                `Wednesday: ${props.opening_hours_wednesday}`}
                        </div>
                        <div id="opening_hours_thursday">
                            {props.opening_hours_thursday &&
                                `Thursday: ${props.opening_hours_thursday}`}
                        </div>
                        <div id="opening_hours_friday">
                            {props.opening_hours_friday &&
                                `Friday: ${props.opening_hours_friday}`}
                        </div>
                        <div id="opening_hours_saturday">
                            {props.opening_hours_saturday &&
                                `Saturday: ${props.opening_hours_saturday}`}
                        </div>
                        <div id="opening_hours_sunday">
                            {props.opening_hours_sunday &&
                                `Sunday: ${props.opening_hours_sunday}`}
                        </div>
                    </div>
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeEstablishmentOpeningHoursRow"
                            href="/edit/opening-hours"
                            aria-label="Change establishment opening hours"
                        >
                            {determineLinkText(
                                props.opening_hours_monday ||
                                    props.opening_hours_tuesday ||
                                    props.opening_hours_wednesday ||
                                    props.opening_hours_thursday ||
                                    props.opening_hours_friday ||
                                    props.opening_hours_saturday ||
                                    props.opening_hours_sunday
                            )}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}
        {props.water_supply || props.validatorErrors["water_supply"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="waterSupplyRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["water_supply"]
                    )}
                >
                    Water supply
                </AccessibleRowHeader>
                <AccessibleCell id="water_supply">
                    {props.water_supply}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeWaterSupplyRow"
                            href="/edit/business-water-supply"
                            aria-label="Change water supply"
                        >
                            {determineLinkText(props.water_supply)}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}
    </React.Fragment>
);

const FoodActivitiesTable = (props) => (
    <React.Fragment>
        <ColumnHeaders />
        {props.customer_type || props.validatorErrors["customer_type"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="activitiesCustomersRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["customer_type"]
                    )}
                >
                    Customers
                </AccessibleRowHeader>
                <AccessibleCell id="customer_type">
                    {props.customer_type}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeActivitiesCustomersRow"
                            href="/edit/customer-type"
                            aria-label="Change activities customer type"
                        >
                            {determineLinkText(props.customer_type)}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.business_type || props.validatorErrors["business_type"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="businessTypeRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["business_type"]
                    )}
                >
                    Business type
                </AccessibleRowHeader>
                <AccessibleCell id="business_type">
                    {props.business_type}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeBusinessTypeRow"
                            href="/edit/business-type"
                            aria-label="Change business type"
                        >
                            {determineLinkText(props.business_type)}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.import_export_activities ||
        props.validatorErrors["import_export_activities"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="activitiesBusinessImportExportRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["import_export_activities"]
                    )}
                >
                    Import and export
                </AccessibleRowHeader>
                <AccessibleCell id="import_export_activities">
                    {props.import_export_activities}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeActivitiesBusinessImportExportRow"
                            href="/edit/business-import-export"
                            aria-label="Change business activities import export"
                        >
                            {determineLinkText(props.import_export_activities)}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}

        {props.business_other_details ||
        props.validatorErrors["business_other_details"] ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="businessOtherDetailsRow"
            >
                <AccessibleRowHeader
                    {...applyRowHeaderStyling(
                        props.validatorErrors["business_other_details"]
                    )}
                >
                    Additional details
                </AccessibleRowHeader>
                <AccessibleCell id="business_other_details">
                    {props.business_other_details}
                </AccessibleCell>
                {props.applicationCompletePage ? null : (
                    <AccessibleChangeCell>
                        <AnchorTag
                            id="changeBusinessOtherDetailsRow"
                            href="/edit/business-other-details"
                            aria-label="Change business other details"
                        >
                            {determineLinkText(props.business_other_details)}
                        </AnchorTag>
                    </AccessibleChangeCell>
                )}
            </AccessibleTableRow>
        ) : null}
    </React.Fragment>
);

const DeclarationTable = (props) => (
    <React.Fragment>
        <ColumnHeaders />
        <AccessibleTableRow
            acPage={props.applicationCompletePage}
            id="declaration1Row"
        >
            <AccessibleRowHeader>
                <span id="declaration1">{props.declaration1}</span>
            </AccessibleRowHeader>
            <AccessibleCell>Accepted</AccessibleCell>
        </AccessibleTableRow>

        <AccessibleTableRow
            acPage={props.applicationCompletePage}
            id="declaration2Row"
        >
            <AccessibleRowHeader>
                <span id="declaration2">{props.declaration2}</span>
            </AccessibleRowHeader>
            <AccessibleCell>Accepted</AccessibleCell>
        </AccessibleTableRow>

        <AccessibleTableRow
            acPage={props.applicationCompletePage}
            id="declaration3Row"
        >
            <AccessibleRowHeader>
                <span id="declaration3">{props.declaration3}</span>
            </AccessibleRowHeader>
            <AccessibleCell>Accepted</AccessibleCell>
        </AccessibleTableRow>
        {props.feedback1 ? (
            <AccessibleTableRow
                acPage={props.applicationCompletePage}
                id="feedback1Row"
            >
                <AccessibleRowHeader>
                    <span id="feedback1">{props.feedback1}</span>
                </AccessibleRowHeader>
                <AccessibleCell>Accepted</AccessibleCell>
            </AccessibleTableRow>
        ) : null}
    </React.Fragment>
);

const SummaryTable = (props) => (
    <React.Fragment>
        <ContentItem.B_45_30>
            <AccessibleTable
                id="operatorDetailsTable"
                caption="Operator details"
                body={<OperatorDetailsTable {...props} />}
            />
        </ContentItem.B_45_30>
        <ContentItem.B_45_30>
            <AccessibleTable
                id="establishmentDetailsTable"
                caption="Establishment details"
                body={<EstablishmentDetailsTable {...props} />}
            />
        </ContentItem.B_45_30>
        <ContentItem.B_45_30>
            <AccessibleTable
                id="foodActivitiesTable"
                caption="Activities"
                body={<FoodActivitiesTable {...props} />}
            />
        </ContentItem.B_45_30>
        {props.applicationCompletePage ? (
            <ContentItem.B_45_30>
                <AccessibleTable
                    id="declarationTable"
                    caption="Declaration"
                    body={<DeclarationTable {...props} />}
                />
            </ContentItem.B_45_30>
        ) : null}
    </React.Fragment>
);

export default SummaryTable;

SummaryTable.propTypes = {
    operator_company_name: PropTypes.string,
    operator_companies_house_number: PropTypes.string,
    operator_charity_name: PropTypes.string,
    operator_charity_number: PropTypes.string,
    operator_address_line_1: PropTypes.string,
    operator_address_line_2: PropTypes.string,
    operator_address_line_3: PropTypes.string,
    operator_town: PropTypes.string,
    operator_postcode: PropTypes.string,
    operator_first_name: PropTypes.string,
    operator_last_name: PropTypes.string,
    registration_role: PropTypes.string,
    establishment_trading_name: PropTypes.string,
    establishment_address_line_1: PropTypes.string,
    establishment_address_line_2: PropTypes.string,
    establishment_address_line_3: PropTypes.string,
    establishment_town: PropTypes.string,
    establishment_postcode: PropTypes.string,
    customer_type: PropTypes.string,
    import_export_activities: PropTypes.string
};
