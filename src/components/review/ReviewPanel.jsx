import ReviewSection from "./ReviewSection";
import ShippingRow from "./ShippingRow";
import CheckoutSummary from "./CheckoutSummary";
import { calculateTotals } from "../../utils/pricing";

function ReviewPanel({
    steps,
    selections,
    activeVariants,
    updateQuantity,
    saveSystem,
}) {
    const reviewOrder = { Cameras: 1, Sensors: 2, Accessories: 3, Plan: 4 };
    const orderedSteps = [...steps].sort(
        (a, b) => (reviewOrder[a.category] || 99) - (reviewOrder[b.category] || 99)
    );

    const { subtotal, compareAtTotal, savings } = calculateTotals(steps, selections);

    const handleCheckout = () => {
        alert("Checkout clicked! (placeholder)");
    };

    return (
        <div className="bg-[#EDF4FF] rounded-lg border border-gray-200 p-5 h-fit">

            <div className="review-panel-grid grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-5">
                    {/* Header */}
                    <div>
                        <div className="text-xs font-semibold tracking-wider text-gray-500 pb-2 border-b border-gray-200">
                            REVIEW
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mt-3">
                            Your security system
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Review your personalized protection system designed to keep what
                            matters most safe.
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="flex flex-col gap-4">
                        {orderedSteps.map((step) => (
                            <ReviewSection
                                key={step.id}
                                step={step}
                                selections={selections}
                                activeVariants={activeVariants}
                                updateQuantity={updateQuantity}
                            />
                        ))}
                    </div>

                    {/* Shipping */}
                    <ShippingRow />
                </div>

                <div className="flex flex-col gap-4 md:justify-start">
                    <CheckoutSummary
                        subtotal={subtotal}
                        compareAtTotal={compareAtTotal}
                        savings={savings}
                        onCheckout={handleCheckout}
                        onSave={saveSystem}
                    />
                </div>
            </div>
        </div>
    );
}

export default ReviewPanel;