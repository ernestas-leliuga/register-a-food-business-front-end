import FsaHeader from "./FsaHeader";
import { GridRow, GridCol, Main } from "govuk-react";

const FsaLayout = props => (
  <div>
    <FsaHeader {...props} />
    <Main>
      <GridRow>
        <GridCol columnTwoThirds>{props.children}</GridCol>
      </GridRow>
    </Main>
  </div>
);

export default FsaLayout;
