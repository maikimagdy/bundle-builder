function VariantChip({ variant, isActive, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`variant-chip flex items-center lg:gap-1  lg:px-2.5  w-auto  rounded-sm border transition cursor-pointer
        ${isActive
                    ? "border-[#4E2FD2] bg-white"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
        >
            {variant.image ? (
                <img
                    src={variant.image}
                    alt={variant.label}
                    className="lg:w-6 lg:h-6 w-4 h-4 object-contain "
                />
            ) : (
                <span
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: variant.swatch }}
                />
            )}

            <span className="lg:text-sm text-[9px] font-medium  text-gray-800">{variant.label}</span>
        </button>
    );
}

export default VariantChip;