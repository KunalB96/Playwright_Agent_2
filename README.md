POC Playwright Agents - [demowebshop](https://demowebshop.tricentis.com/)
This repository is a proof-of-concept for using Playwright's AI-driven testing workflow against the SauceDemo demo application.

It includes:

a product requirements document for the shopping flow
a generated test plan under specs/
Playwright end-to-end tests for the main demowebshop user journeys
a guide explaining the Playwright Test Agent workflow
Overview
The project demonstrates how a Playwright agent-based workflow can help:

plan a test strategy from product requirements
generate Playwright test specs from a plan
validate the user journeys in a real browser
repair failing locators or assertions when UI behavior changes
The application under test is:

https://www.saucedemo.com
Project Structure
.
├── .github/
│   └── agents/
├── specs/
│   ├── README.md
│   └── sauce-demo-core-user-operations.plan.md
├── tests/
│   ├── browse-products-and-add-to-cart.spec.ts
│   ├── checkout-with-required-information-and-complete-purchase.spec.ts
│   ├── login-with-valid-credentials.spec.ts
│   ├── logout-and-reset-application-state.spec.ts
│   ├── seed.spec.ts
│   └── view-cart-and-modify-order.spec.ts
├── .gitignore
├── .playwright-mcp/
├── Playwright_agents_guide.md
├── SauceDemo_PRD.md
├── package.json
├── playwright.config.ts
├── README.md
└── package-lock.json
Prerequisites
Node.js 18 or later
npm
A modern browser environment supported by Playwright
Setup
Install dependencies:

npm install
Install the Playwright browser binaries:

npx playwright install
Running Tests
Run the full suite:

npx playwright test
Run a single spec file:

npx playwright test tests/login-with-valid-credentials.spec.ts
Open the HTML report after a run:

npx playwright show-report
Included Scenarios
The generated tests cover the core SauceDemo flows:

login with valid credentials
browse products and add items to cart
view and modify cart contents
complete checkout with required information
logout and reset application state
Notes
This is a demonstration project intended for learning, experimentation, and validating an AI-assisted Playwright workflow in a real-world e-commerce testing scenario.

License
This project is shared for educational and proof-of-concept purposes.
