import ReviewLineItem from "./ReviewLineItem";

function ReviewSection({
    step,
    selections,
    activeVariants,
    updateQuantity,
}) {
    const lineItems = [];

    step.products.forEach((product) => {
        if (product.variants && product.variants.length > 0) {
            product.variants.forEach((variant) => {
                const qty = selections[`${product.id}__${variant.id}`] || 0;
                if (qty > 0) {
                    lineItems.push({ product, variant, quantity: qty });
                }
            });
        } else {
            const qty = selections[product.id] || 0;
            if (qty > 0) {
                lineItems.push({ product, variant: null, quantity: qty });
            }
        }
    });

    if (lineItems.length === 0) return null;

    return (
        <div className="border-t border-gray-200 pt-3">
            <div className="text-xs font-medium tracking-wider text-[#A8B2BD] uppercase mb-2">
                {step.category}
            </div>

            <div className="flex flex-col gap-1">
                {lineItems.map((item) => (
                    <ReviewLineItem
                        key={`${item.product.id}__${item.variant?.id || "novariant"}`}
                        product={item.product}
                        variant={item.variant}
                        quantity={item.quantity}
                        updateQuantity={updateQuantity}
                        category={step.category}   // ← NEW
                    />
                ))}
            </div>
        </div>
    );
}

export default ReviewSection;