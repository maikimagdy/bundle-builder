function PriceTag({ pricing }) {
    if (!pricing) return null;

    const { compareAt, price, suffix = "", isFree = false } = pricing;

    const formatPrice = (value) => `$${value.toFixed(2)}`;

    return (
        <div className="flex flex-col items-end leading-tight">
            {compareAt != null && (
                <span className="text-md text-[#D8392B] line-through">
                    {formatPrice(compareAt)}
                    {suffix}
                </span>
            )}

            <span className="text-md font-bold text-[#575757]">
                {isFree ? "FREE" : `${formatPrice(price)}${suffix}`}
            </span>
        </div>
    );
}

export default PriceTag;