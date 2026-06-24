import Badge from "../shared/Badge";
import PriceTag from "../shared/PriceTag";
import QuantityStepper from "../shared/QuantityStepper";
import VariantSelector from "./VariantSelector";

function ProductCard({
    product,
    selections,
    activeVariants,
    updateQuantity,
    setActiveVariant,
}) {
    // ---------- Derive active variant ----------
    const hasVariants = product.variants && product.variants.length > 0;
    const activeVariantId = hasVariants ? activeVariants[product.id] : null;

    // ---------- Selection key + quantity ----------
    const selectionKey = activeVariantId
        ? `${product.id}__${activeVariantId}`
        : product.id;
    const quantity = selections[selectionKey] || 0;
    const isSelected = quantity > 0;

    // ---------- Handlers ----------
    const handleQuantityChange = (newQty) => {
        updateQuantity(product.id, activeVariantId, newQty);
    };

    const handleVariantChange = (variantId) => {
        setActiveVariant(product.id, variantId);
    };

    // Toggle handler for subscriptions: 0 ↔ 1
    const handleTogglePlan = () => {
        updateQuantity(product.id, activeVariantId, isSelected ? 0 : 1);
    };

    return (
        <div
            className={`bg-white rounded-lg border-2 transition lg:p-4 p-2 flex gap-4 h-full
        ${isSelected ? "border-[#4E2FD2]" : "border-gray-200"}`}
        >
            {/* LEFT COLUMN: Badge stacked over Image */}
            <div className="flex flex-col items-center gap-2 shrink-0 w-20">
                {/* Badge slot — always present (even empty) so image alignment stays consistent */}
                <div className="h-6 flex items-center ">
                    {product.badge && <Badge text={product.badge} />}
                </div>

                {/* Image */}
                <div className="w-20 h-20 flex items-center justify-center  rounded">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                    />
                </div>
            </div>

            {/* RIGHT COLUMN: All info */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
                {/* Title */}
                <h3 className="text-base font-bold text-gray-900 leading-tight">
                    {product.title}
                </h3>

                {/* Description + Learn More */}
                <p className="text-[#484848] text-[12px] leading-snug">
                    {product.description}{" "}
                    <a
                        href={product.learnMoreUrl}
                        className="text-[#0000EE] font-medium underline"
                    >
                        Learn More
                    </a>
                </p>

                {/* Variants */}
                {hasVariants && (
                    <VariantSelector
                        variants={product.variants}
                        activeVariantId={activeVariantId}
                        onVariantChange={handleVariantChange}
                    />
                )}

                {/* Bottom row: Toggle button (plans) OR Stepper (everything else) + Price */}
                <div className="flex items-center justify-between mt-auto pt-1 gap-3" style={{ fontFamily: "Gilroy-Regular" }}>
                    {product.isSubscription ? (
                        <button
                            type="button"
                            onClick={handleTogglePlan}
                            className={`px-4 py-1.5 text-sm font-semibold rounded-md border-2 transition cursor-pointer
                                ${isSelected
                                    ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
                                    : "bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                                }`}
                        >
                            {isSelected ? "Added ✓" : "Add to bundle"}
                        </button>
                    ) : (
                        <QuantityStepper value={quantity} onChange={handleQuantityChange} />
                    )}
                    <PriceTag pricing={product.pricing} />
                </div>
            </div>
        </div>
    );
}

export default ProductCard;