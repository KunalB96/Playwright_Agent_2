# Tricentis Demo Web Shop Core User Operations

## Application Overview

End-to-end coverage for the Tricentis Demo Web Shop at https://demowebshop.tricentis.com. Each test starts from a fresh browser context and uses unique data where account creation is required. The five suites represent account access, product discovery, cart management, checkout/order placement, and session termination.

## Test Scenarios

### 1. Account Registration and Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Register a new customer account

**File:** `tests/account-registration.spec.ts`

**Steps:**
  1. Open https://demowebshop.tricentis.com and select Register.
    - expect: The Register page is displayed with gender, first name, last name, email, password, and confirm password fields.
  2. Select a gender and enter valid first name, last name, a unique email address, a password, and the matching confirmation.
    - expect: All entered values are accepted.
  3. Submit the registration form.
    - expect: Registration succeeds and a registration-completed confirmation is displayed.
    - expect: The new account is signed in or provides a clear continuation to the signed-in storefront.
    - expect: The header changes from Register/Log in to the authenticated account controls.

#### 1.2. Reject invalid registration and invalid login credentials

**File:** `tests/account-validation.spec.ts`

**Steps:**
  1. Open Register and submit the form with required fields empty.
    - expect: Validation messages identify the required fields.
    - expect: The account is not created.
  2. Enter a valid password and a different confirm password, then submit.
    - expect: A password mismatch validation message is displayed.
    - expect: The registration form remains available for correction.
  3. Open Log in, enter an unknown email and password, and submit.
    - expect: A clear invalid-credentials error is displayed.
    - expect: The user remains on the login page and is not authenticated.

### 2. Product Discovery

**Seed:** `tests/seed.spec.ts`

#### 2.1. Browse a category and inspect product discovery controls

**File:** `tests/product-discovery.spec.ts`

**Steps:**
  1. Open the Books category from the main navigation.
    - expect: The Books category page is displayed.
    - expect: Book products show names, prices, and available Add to cart controls.
  2. Change the view mode between Grid and List.
    - expect: The product presentation changes to the selected mode without losing the category context.
  3. Change sorting to Price: Low to High and change the page size.
    - expect: The product order reflects the selected price sort.
    - expect: The number of products shown reflects the selected page size.
  4. Select a price range filter such as Under 25.00.
    - expect: Only products matching the selected price range are shown.

#### 2.2. Search for an existing and nonexistent product

**File:** `tests/product-search.spec.ts`

**Steps:**
  1. From the storefront header, enter computer in the Search store field and submit.
    - expect: The browser navigates to the search results page with the query preserved.
    - expect: Matching products are displayed.
  2. Search for a deliberately nonexistent term such as no-such-product-98765.
    - expect: The page clearly reports that no products were found.
    - expect: No unrelated product is presented as a match.

### 3. Shopping Cart Management

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add, update, and remove a product in the cart

**File:** `tests/shopping-cart.spec.ts`

**Steps:**
  1. Open the Books category and add an available product such as Computing and Internet to the cart.
    - expect: A success notification or equivalent confirmation is displayed.
    - expect: The header cart count changes from 0 to 1.
  2. Open the shopping cart.
    - expect: The cart contains the selected product, its unit price, quantity 1, and line total.
    - expect: The subtotal and total are calculated correctly.
  3. Change the quantity to 2 and select Update shopping cart.
    - expect: The quantity becomes 2.
    - expect: The line total and cart total are recalculated.
  4. Select the product's remove checkbox and update the cart.
    - expect: The product is removed.
    - expect: The cart count returns to 0 and the empty-cart message is displayed.

#### 3.2. Block checkout until terms are accepted

**File:** `tests/cart-checkout-gate.spec.ts`

**Steps:**
  1. Add an available product and open the shopping cart.
    - expect: The cart contains the product and presents the terms-of-service checkbox and Checkout control.
  2. Select Checkout without accepting the terms of service.
    - expect: A Terms of service dialog or validation message asks the shopper to accept the terms.
    - expect: The checkout flow does not advance.
  3. Close the dialog, accept the terms, and select Checkout while signed out.
    - expect: The shopper is redirected to the login or checkout-as-guest page.
    - expect: The cart remains associated with the checkout attempt.

### 4. Checkout and Order Placement

**Seed:** `tests/seed.spec.ts`

#### 4.1. Complete checkout and place an order as a registered customer

**File:** `tests/checkout.spec.ts`

**Steps:**
  1. Register or sign in with a valid customer account, add an available product to the cart, accept the terms of service, and select Checkout.
    - expect: The checkout flow opens and displays the Address, Shipping, Payment, Confirm, and Complete stages.
  2. Enter or select a valid billing address and continue.
    - expect: The billing address is accepted and the shipping step is displayed.
  3. Select an available shipping method and continue.
    - expect: The selected shipping method is retained and the payment step is displayed.
  4. Select an available payment method, provide any required payment details, and continue.
    - expect: The payment step completes and the order confirmation review is displayed.
  5. Review the product, quantity, shipping, tax, and total, then confirm the order.
    - expect: The order is placed successfully.
    - expect: A completion page displays an order number or confirmation.
    - expect: The cart is empty after completion.

#### 4.2. Prevent checkout progression when required checkout data is missing

**File:** `tests/checkout-validation.spec.ts`

**Steps:**
  1. Start checkout with a product in the cart and leave a required address, shipping, or payment field unselected or empty.
    - expect: The relevant checkout step remains open.
    - expect: A validation message identifies the missing required information.
    - expect: The shopper cannot proceed to the next step until the data is corrected.

### 5. Logout and Session Termination

**Seed:** `tests/seed.spec.ts`

#### 5.1. Log out from an authenticated account

**File:** `tests/logout.spec.ts`

**Steps:**
  1. Sign in with a valid customer account.
    - expect: The authenticated account controls are visible.
  2. Select Log out.
    - expect: The session ends and the storefront shows Register and Log in links.
    - expect: Authenticated account pages are no longer available without signing in again.
  3. Open the cart or return to the storefront after logout.
    - expect: The public storefront remains accessible.
    - expect: The account is not silently authenticated.

#### 5.2. Reject access to authenticated account pages after logout

**File:** `tests/logout-protection.spec.ts`

**Steps:**
  1. Sign in, open My account, and then log out.
    - expect: The user is logged out successfully.
  2. Navigate to the Orders or Addresses account page.
    - expect: The user is redirected to login or shown an authentication requirement.
    - expect: Private account data is not displayed.
