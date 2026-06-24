function StepHeader({
    stepLabel,
    title,
    icon,
    isOpen,
    selectedCount,
    onClick,
}) {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer ${isOpen ? 'bg-[#EDF4FF]' : 'bg-white'}  rounded-t-lg select-none`}
        >
            {/* Top tiny label: STEP X OF 4 */}
            <div className="px-5 pt-3 pb-2 text-xs font-semibold tracking-wider text-gray-500 border-b border-gray-200">
                {stepLabel}
            </div>

            {/* Main row: icon + title + right side indicator */}
            <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                    {icon && (
                        <img src={icon} alt="" className="w-6 h-6 object-contain" />
                    )}
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                </div>

                <div className="flex items-center gap-1 text-sm text-[#4E2FD2] font-medium">
                    {isOpen ? (
                        <>
                            <span>{selectedCount} selected</span>
                            <span>▲</span>
                        </>
                    ) : (
                        <span>▼</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StepHeader;