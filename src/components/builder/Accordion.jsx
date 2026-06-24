import AccordionStep from "./AccordionStep";

function Accordion({
    steps,
    selections,
    activeVariants,
    openStep,
    updateQuantity,
    setActiveVariant,
    toggleStep,
}) {
    return (
        <div className="flex flex-col gap-4">
            {steps.map((step) => (
                <AccordionStep
                    key={step.id}
                    step={step}
                    isOpen={openStep === step.id}
                    isLast={step.id === steps.length}
                    selections={selections}
                    activeVariants={activeVariants}
                    updateQuantity={updateQuantity}
                    setActiveVariant={setActiveVariant}
                    toggleStep={toggleStep}
                />
            ))}
        </div>
    );
}

export default Accordion;