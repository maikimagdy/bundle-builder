/**
 * Walks through all selected items and computes pricing totals.
 *
 * @param {Array} steps - The full steps array from products.json
 * @param {Object} selections - { "productId__variantId": quantity }
 * @returns {Object} { itemsCount, subtotal, compareAtTotal, savings }
 */
export function calculateTotals(steps, selections) {
    let itemsCount = 0;
    let subtotal = 0;
    let compareAtTotal = 0;

    steps.forEach((step) => {
        step.products.forEach((product) => {
            const { price = 0, compareAt } = product.pricing || {};
            // If no compareAt is defined, treat it as same as price (no savings)
            const effectiveCompareAt = compareAt ?? price;

            if (product.variants && product.variants.length > 0) {
                // Product has variants → sum each variant's qty separately
                product.variants.forEach((variant) => {
                    const key = `${product.id}__${variant.id}`;
                    const qty = selections[key] || 0;
                    if (qty > 0) {
                        itemsCount += qty;
                        subtotal += price * qty;
                        compareAtTotal += effectiveCompareAt * qty;
                    }
                });
            } else {
                // No variants → use product id as the key
                const qty = selections[product.id] || 0;
                if (qty > 0) {
                    itemsCount += qty;
                    subtotal += price * qty;
                    compareAtTotal += effectiveCompareAt * qty;
                }
            }
        });
    });

    const savings = compareAtTotal - subtotal;

    return {
        itemsCount,
        subtotal: round2(subtotal),
        compareAtTotal: round2(compareAtTotal),
        savings: round2(savings),
    };
}

/**
 * Round to 2 decimals to avoid floating-point issues
 * (e.g., 0.1 + 0.2 = 0.30000000000000004)
 */
function round2(value) {
    return Math.round(value * 100) / 100;
}

/**
 * Format a number as currency: 187.89 → "$187.89"
 */
export function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
}