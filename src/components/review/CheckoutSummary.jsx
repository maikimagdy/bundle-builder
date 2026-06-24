import { useState } from "react";
import { formatCurrency } from "../../utils/pricing";

function CheckoutSummary({
    subtotal,
    compareAtTotal,
    savings,
    onCheckout,
    onSave,
}) {
    // Simple financing estimate: total / 12 months
    const monthlyEstimate = (subtotal / 12).toFixed(2);

    // Only show strikethrough if there's an actual discount
    const hasDiscount = compareAtTotal > subtotal;
    const hasSavings = savings > 0;

    // Local state to show "✓ Saved!" feedback temporarily
    const [justSaved, setJustSaved] = useState(false);

    const handleSaveClick = () => {
        const success = onSave?.();
        if (success !== false) {
            setJustSaved(true);
            setTimeout(() => setJustSaved(false), 2000);
        }
    };

    return (
        <div className="guarantee-badge flex flex-col gap-4  border-t border-gray-200 pt-4">
            {/* TOP ROW: Guarantee badge (left) + Total area (right) */}
            <div className="flex items-center justify-between gap-4">
                {/* Guarantee image */}
                <img
                    src="/100%-logo.png"
                    alt="100% Wyze satisfaction guarantee"
                    className="w-20 h-20 object-contain shrink-0"
                />

                {/* Right side: pill + prices */}
                <div className="flex flex-col items-end gap-2">
                    {/* Financing pill */}
                    <span className="inline-block bg-[#4E2FD2] text-white text-xs font-medium px-3 py-1 rounded-md">
                        as low as ${monthlyEstimate}/mo
                    </span>

                    {/* Prices */}
                    <div className="flex items-baseline gap-2">
                        {hasDiscount && (
                            <span className="text-md text-gray-400 font-medium line-through">
                                {formatCurrency(compareAtTotal)}
                            </span>
                        )}
                        <span className="text-2xl font-extrabold text-[#4E2FD2]">
                            {formatCurrency(subtotal)}
                        </span>
                    </div>
                </div>
            </div>

            {/* SAVINGS LINE */}
            {hasSavings && (
                <p className="text-center text-xs font-semibold text-[#0AA288]">
                    Congrats! You're saving {formatCurrency(savings)} on your security bundle!
                </p>
            )}

            {/* CHECKOUT BUTTON */}
            <button
                type="button"
                onClick={onCheckout}
                className="w-full bg-[#4E2FD2] hover:bg-[#3A269A] text-white text-base font-semibold py-3 rounded-md transition cursor-pointer"
            >
                Checkout
            </button>

            {/* SAVE LINK — changes to "✓ Saved!" for 2 seconds when clicked */}
            <button
                type="button"
                onClick={handleSaveClick}
                disabled={justSaved}
                className={`text-sm underline transition cursor-pointer mx-auto
                    ${justSaved
                        ? "text-[#0AA288] no-underline cursor-default"
                        : "text-[#6F7882] hover:text-[#4E2FD2]"
                    }`}
            >
                {justSaved ? "✓ Saved!" : "Save my system for later"}
            </button>
        </div>
    );
}

export default CheckoutSummary;