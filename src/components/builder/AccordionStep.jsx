import { useRef, useEffect } from "react";
import StepHeader from "./StepHeader";
import ProductCard from "./ProductCard";

function AccordionStep({
    step,
    isOpen,
    isLast,
    selections,
    activeVariants,
    updateQuantity,
    setActiveVariant,
    toggleStep,
}) {


    // For Scroll Animation
    const stepRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            stepRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [isOpen]);

    const selectedCount = step.products.reduce((count, product) => {
        if (product.variants && product.variants.length > 0) {
            const hasAny = product.variants.some(
                (v) => (selections[`${product.id}__${v.id}`] || 0) > 0
            );
            return hasAny ? count + 1 : count;
        } else {
            return (selections[product.id] || 0) > 0 ? count + 1 : count;
        }
    }, 0);

    return (
        <div
            ref={stepRef}
            className={`rounded-lg border ${isOpen ? "border-[#6366F1]" : "border-gray-200"
                } bg-[#EDF0FE] overflow-hidden scroll-mt-4`}
        >
            <StepHeader
                stepLabel={step.stepLabel}
                title={step.title}
                icon={step.icon}
                isOpen={isOpen}
                selectedCount={selectedCount}
                onClick={() => toggleStep(step.id)}
            />

            {isOpen && (
                <div className="lg:p-5 p-3 bg-[#EDF4FF]">
                    <div className="flex  lg:flex-wrap flex-nowrap lg:flex-row lg:gap-4 gap-2 justify-center items-stretch accordion-content">
                        {step.products.map((product) => (
                            <div
                                key={product.id}
                                className="w-full md:w-[calc(50%-0.5rem)]"
                            >
                                <ProductCard
                                    product={product}
                                    selections={selections}
                                    activeVariants={activeVariants}
                                    updateQuantity={updateQuantity}
                                    setActiveVariant={setActiveVariant}
                                />
                            </div>
                        ))}
                    </div>

                    {!isLast && step.nextLabel && (
                        <button
                            onClick={() => toggleStep(step.id + 1)}
                            className="mt-5 w-60 max-w-xs mx-auto block border font-semibold rounded-md hover:bg-indigo-50 cursor-pointer"
                            style={{
                                color: "#4E2FD2",
                                borderColor: "#4E2FD2",
                                padding: "5px",
                            }}
                        >
                            {step.nextLabel}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default AccordionStep;