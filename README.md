# Register a food business front end ffdf

## Setting up your development environment

To run this application, you must use the [register-a-food-business-environment](https://github.com/FoodStandardsAgency/register-a-food-business-environment) repository to set up your development environment.

It is recommended that you install the Prettier code-formatting extension for your IDE.

## Contributing to this repository

The following contribution guides are available:

#### High-level tasks

* [Building, starting, and testing the application](./docs/contribution-guidelines/building-starting-testing-the-app.md)
* [Creating a new page](./docs/contribution-guidelines/creating-a-new-page.md)
* [Adding a new data field](./docs/contribution-guidelines/adding-a-new-data-field.md)
* [Changing the form order](./docs/contribution-guidelines/changing-the-form-order.md)

#### Further information and detailed tasks

* [The repository structure](./docs/contribution-guidelines/the-repository-structure.md)
* [The tech stack](./docs/contribution-guidelines/the-tech-stack.md)
* [The dynamic form path](./docs/contribution-guidelines/the-dynamic-form-path.md)
* [Data flow](./docs/contribution-guidelines/data-flow.md)
* [Edit mode](./docs/contribution-guidelines/edit-mode.md)
* [Transforming user data for the summary page](./docs/contribution-guidelines/transforming-data-summary-page.md)
* [Transforming user data for submission](./docs/contribution-guidelines/transforming-data-submission.md)
* [Maintenance mode](./docs/contribution-guidelines/maintenance-mode.md)

#### Client-side JavaScript

Although vast majority of web users have JavaScript enabled by default, the application must allow for the registration process to be completed without client-side JavaScript. Where the use of JavaScript dramatically improves user experience, use "componentDidMount" to verify if it is enabled and render component requiring JavaScript - but make sure to provide a fallback component within <noscript> tag for users who have it disabled.
