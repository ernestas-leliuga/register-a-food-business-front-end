const SessionWrapper = Page => {
  const wrapper = props => <Page {...props} />;

  wrapper.getInitialProps = ({ req }) => {
    const initialProps = {
      cumulativeAnswers:
        req && req.session && req.session.cumulativeAnswers
          ? req.session.cumulativeAnswers
          : {},
      validatorErrors:
        req && req.session && req.session.validatorErrors
          ? req.session.validatorErrors
          : {},
      switches:
        req && req.session && req.session.switches ? req.session.switches : {},
      fsaRegistrationNumber:
        req && req.session && req.session.fsaRegistrationNumber
          ? req.session.fsaRegistrationNumber
          : "",
      submissionDate:
        req && req.session && req.session.submissionDate
          ? req.session.submissionDate
          : "",
      recipient:
        req && req.session && req.session.recipient
          ? req.session.recipient
          : "",

      localCouncil: "Rushmoor Borough Council",
      localCouncilEmail: "food@rushmoorboroughcouncil.gov.uk",
      addressLookups:
        req && req.session && req.session.addressLookups
          ? req.session.addressLookups
          : {}
    };

    req && req.query && req.query.edit === "on"
      ? (initialProps.editMode = true)
      : (initialProps.editMode = false);

    return initialProps;
  };

  return wrapper;
};

export default SessionWrapper;
