import Accordion from "./Accordion";

function Builder({
    steps,
    selections,
    activeVariants,
    openStep,
    updateQuantity,
    setActiveVariant,
    toggleStep,
}) {
    return (
        <div className="flex flex-col w-full gap-4">
            <Accordion
                steps={steps}
                selections={selections}
                activeVariants={activeVariants}
                openStep={openStep}
                updateQuantity={updateQuantity}
                setActiveVariant={setActiveVariant}
                toggleStep={toggleStep}
            />
        </div>
    );
}

export default Builder;