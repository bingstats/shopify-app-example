// @ts-check

/**
 * @typedef {import("../generated/api").CartValidationsGenerateRunInput} CartValidationsGenerateRunInput
 * @typedef {import("../generated/api").CartValidationsGenerateRunResult} CartValidationsGenerateRunResult
 */

/**
 * @param {CartValidationsGenerateRunInput} input
 * @returns {CartValidationsGenerateRunResult}
 */
export function cartValidationsGenerateRun(input) {
  const error = {
    message: "There is an order maximum of $1,000 for customers without established order history.",
    target: "$.cart"
  };

  const orderSubtotal = parseFloat(input.cart.cost.subtotalAmount.amount);
  const errors = [];

  if (orderSubtotal > 1000.0) {
    const numberOfOrders = input.cart.buyerIdentity?.customer?.numberOfOrders ?? 0;
    // If the customer has ordered less than 5 times in the past,
    // then treat them as a new customer.
    if (numberOfOrders < 5) {
      errors.push(error);
    }
  }

  // A single validation operation
  const operations = [
    {
      validationAdd: {
        errors
      },
    },
  ];

  return { operations };
};
