import VariantChip from "./VariantChip";

function VariantSelector({ variants, activeVariantId, onVariantChange }) {
    if (!variants || variants.length === 0) return null;

    return (
        <div className="flex lg:flex-nowrap flex-nowrap lg:gap-2 w-full gap-1 variant-selector">
            {variants.map((variant) => (
                <VariantChip
                    key={variant.id}
                    variant={variant}
                    isActive={variant.id === activeVariantId}
                    onClick={() => onVariantChange(variant.id)}
                />
            ))}
        </div>
    );
}

export default VariantSelector;