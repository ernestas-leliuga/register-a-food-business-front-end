import OpeningDaysStart from "../../pages/opening-days-start";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

describe("<OpeningDaysStart />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OpeningDaysStart />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <OpeningDaysStart
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders 3 radio buttons with correct error props and default values", () => {
    const wrapper = mount(
      <OpeningDaysStart
        validatorErrors={testValidatorErrors}
        cumulativeAnswers={testCumulativeAnswers}
        switches={testSwitches}
      />
    );
    const openingDaysStartRadio = wrapper.find("Radio");
    expect(openingDaysStartRadio.length).toBe(3);
  });

  describe("top-level MultiChoice element", () => {
    it("renders the correct error", () => {
      const validatorErrors = {
        opening_days_start: "test error"
      };
      const wrapper = mount(
        <OpeningDaysStart
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const openingDaysStart = wrapper.find("MultiChoice");
      expect(openingDaysStart.props().meta.error).toBe("test error");
    });
  });

  describe("all Radio buttons", () => {
    it("can be selected by default", () => {
      const radioButtonIdsAndValues = {
        opening_days_start_everyday: "Every day",
        opening_days_start_some_days: "Some days",
        opening_days_start_irregular_days: "Irregular days"
      };

      for (let radioButtonId in radioButtonIdsAndValues) {
        const cumulativeAnswers = {
          opening_days_start: radioButtonIdsAndValues[radioButtonId]
        };

        const wrapper = mount(
          <OpeningDaysStart
            validatorErrors={testValidatorErrors}
            cumulativeAnswers={cumulativeAnswers}
            switches={testSwitches}
          />
        );

        const openingDaysStartRadio = wrapper.find(`Radio#${radioButtonId}`);
        expect(openingDaysStartRadio.props().defaultChecked).toBe(true);
      }
    });
  });
});