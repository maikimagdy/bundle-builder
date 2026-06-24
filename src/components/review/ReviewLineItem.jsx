import QuantityStepper from "../shared/QuantityStepper";

function ReviewLineItem({
    product,
    variant,
    quantity,
    updateQuantity,
    category,
}) {
    const displayName = product.title;
    const imageSrc = product.image;
    const { compareAt, price, suffix = "", isFree = false } = product.pricing;
    const showStepper = category !== "Plan";

    const isUnlimited = product.id === "cam-unlimited";

    // 🧮 Calculate line totals (price × quantity)
    // Subscriptions show per-month price (no multiplication)
    const isSubscription = product.isSubscription;
    const lineQty = isSubscription ? 1 : quantity;

    const linePrice = price * lineQty;
    const lineCompareAt = compareAt != null ? compareAt * lineQty : null;

    const handleChange = (newQty) => {
        updateQuantity(product.id, variant?.id || null, newQty);
    };

    // Split "Cam Unlimited" into separate words
    const renderName = () => {
        const words = displayName.split(" ");
        return words.map((word, idx) => (
            <span key={idx}>
                {word === "Unlimited" ? (
                    <span className="text-[#4E2FD2] font-bold">{word}</span>
                ) : (
                    <span className="font-bold">{word}</span>
                )}
                {idx < words.length - 1 ? " " : ""}
            </span>
        ));
    };

    return (
        <div className="flex items-center gap-3 py-2">
            {/* Thumbnail */}
            <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-white rounded">
                <img
                    src={imageSrc}
                    alt={displayName}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                />
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0 text-sm font-medium leading-tight">
                {isUnlimited ? renderName() : displayName}{" "}
                {variant?.label && `(${variant.label})`}
            </div>

            {/* Stepper */}
            {showStepper && (
                <QuantityStepper value={quantity} onChange={handleChange} />
            )}

            {/* Price (line total = price × qty) */}
            <div className="flex flex-col items-end leading-tight min-w-[60px]">
                {lineCompareAt != null && (
                    <span className="text-xs text-[#6F7882] line-through">
                        ${lineCompareAt.toFixed(2)}
                        {suffix}
                    </span>
                )}
                <span className="text-sm font-bold text-[#4E2FD2]">
                    {isFree ? "FREE" : `$${linePrice.toFixed(2)}${suffix}`}
                </span>
            </div>
        </div>
    );
}

export default ReviewLineItem;