import {
  transformAnswersForSubmit,
  transformAnswersForPage
} from "./data-transform.service";

describe("session-management.service transformAnswersForSubmit()", () => {
  const testCumulativeAnswers = {
    operator_first_name: "John",
    operator_last_name: "Appleseed",
    operator_primary_number: "01234 567890",
    operator_email: "john@appleseed.com",
    establishment_trading_name: "John's Apples"
  };

  describe("given a cumulative answers object", () => {
    it("returns an object", () => {
      const result = transformAnswersForSubmit(testCumulativeAnswers);
      expect(typeof result).toBe("object");
    });

    describe("given the registration_role is not Representative and operator_type is not passed", () => {
      const registrationRoleOnly = {
        registration_role: "test",
        other_data: "example"
      };

      it("the transformed data contains a field called operator_type that equals the passed registration_role data", () => {
        const result = transformAnswersForSubmit(registrationRoleOnly);
        expect(result.operator_type).toEqual(
          registrationRoleOnly.registration_role
        );
      });

      it("the transformed data does not contain a field called registration_role", () => {
        const result = transformAnswersForSubmit(registrationRoleOnly);
        expect(result.registration_role).toBe(undefined);
      });
    });

    describe("given the registration_role is Representative and operator_type is passed", () => {
      const registrationRoleAndOperatorType = {
        registration_role: "Representative",
        operator_type: "test",
        other_data: "example"
      };

      it("the transformed data contains a field called operator_type that does not equal the passed registration_role data", () => {
        const result = transformAnswersForSubmit(
          registrationRoleAndOperatorType
        );
        expect(result.operator_type).not.toEqual(
          registrationRoleAndOperatorType.registration_role
        );
      });

      it("the transformed data does not contain a field called registration_role", () => {
        const result = transformAnswersForSubmit(
          registrationRoleAndOperatorType
        );
        expect(result.registration_role).toBe(undefined);
      });

      it("the transformed data contains a field called operator_type that does not equal the original operator_type data", () => {
        const result = transformAnswersForSubmit(
          registrationRoleAndOperatorType
        );
        expect(result.operator_type).not.toEqual(
          registrationRoleAndOperatorType.operator_type
        );
      });

      it("the transformed data contains a field called operator_type that contains the original text plus an additional representative description", () => {
        const operatorTypesArray = ["A person", "A charity", "A company"];

        operatorTypesArray.forEach(operatorType => {
          const data = {
            registration_role: "Representative",
            operator_type: operatorType,
            other_data: "example"
          };

          const result = transformAnswersForSubmit(data);

          expect(result.operator_type).toBe(
            `${operatorType} (registered by a representative)`
          );
        });
      });
    });

    describe("given that registration_role is Representative but operator_type is not passed", () => {
      const data = {
        registration_role: "Representative",
        other_data: "example"
      };

      it("throws an error", () => {
        expect(() => transformAnswersForSubmit(data)).toThrow(Error);
      });
    });
  });
});

describe("session-management.service transformAnswersForPage()", () => {
  describe("Given a tranform type and cumulative answers", () => {
    describe("Given the transform type is handled", () => {
      const customerTypeTransform = "customerType";
      const testCumulativeAnswers = { example: "value" };

      describe("Given the transform type is customerType", () => {
        describe("Given that neither supply_other nor supply_directly are part of cumulative answers", () => {
          it("Should return customer_type value of undefined", () => {
            const result = transformAnswersForPage(
              customerTypeTransform,
              testCumulativeAnswers
            );

            expect(result.customer_type).toBe(undefined);
          });
        });

        describe("Given that supply_other and supply_directly are part of cumulative answers", () => {
          const testCumulativeAnswers = {
            supply_directly: "True",
            supply_other: "True"
          };

          it("Should return an object with 1 key (customer_type)", () => {
            const result = transformAnswersForPage(
              customerTypeTransform,
              testCumulativeAnswers
            );
            const length = Object.keys(result).length;
            expect(length).toBe(1);
          });

          it("Should return a customer_type value of 'End consumer and other businesses'", () => {
            const result = transformAnswersForPage(
              customerTypeTransform,
              testCumulativeAnswers
            );
            expect(result.customer_type).toBe(
              "End consumer and other businesses"
            );
          });
        });
        describe("Given that only supply_other is part of cumulative answers", () => {
          const testCumulativeAnswers = {
            supply_other: "True"
          };
          it("Should return a customer_type value of 'Other businesses'", () => {
            const result = transformAnswersForPage(
              customerTypeTransform,
              testCumulativeAnswers
            );
            expect(result.customer_type).toBe("Other businesses");
          });
        });
        describe("Given that only supply_directly is part of cumulative answers", () => {
          const testCumulativeAnswers = {
            supply_directly: "True"
          };
          it("Should return a customer_type value of 'End consumer'", () => {
            const result = transformAnswersForPage(
              customerTypeTransform,
              testCumulativeAnswers
            );
            expect(result.customer_type).toBe("End consumer");
          });
        });
      });
    });

    describe("Given the transform type is not handled", () => {
      const badTransformTypes = ["bad type", undefined];
      const testCumulativeAnswers = { example: "value" };

      it("Should throw an error", () => {
        badTransformTypes.forEach(badType => {
          expect(() =>
            transformAnswersForPage(badType, testCumulativeAnswers)
          ).toThrow(Error);
        });
      });
    });
  });

  describe("Given an undefined cumulative answers", () => {
    const testTransformType = "customerType";
    const badCumulativeAnswers = undefined;
    it("Should throw an error", () => {
      expect(() =>
        transformAnswersForPage(testTransformType, badCumulativeAnswers)
      ).toThrow(Error);
    });
  });
});
