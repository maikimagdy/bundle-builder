function QuantityStepper({ value = 0, onChange, min = 0, max = 99 }) {
    const handleDecrement = () => {
        if (value > min) onChange(value - 1);
    };

    const handleIncrement = () => {
        if (value < max) onChange(value + 1);
    };

    const isMinusDisabled = value <= min;
    const isPlusDisabled = value >= max;

    return (
        <div className="inline-flex items-center gap-2">
            {/* Minus button */}
            <button
                type="button"
                onClick={handleDecrement}
                disabled={isMinusDisabled}
                className={`w-7 h-7 flex  items-center justify-center rounded border text-lg font-medium transition
          ${isMinusDisabled
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    }`}
            >
                −
            </button>

            {/* Value display */}
            <span className="min-w-[20px] text-center text-base font-medium text-gray-900">
                {value}
            </span>

            {/* Plus button */}
            <button
                type="button"
                onClick={handleIncrement}
                disabled={isPlusDisabled}
                className={`w-7 h-7 flex items-center justify-center rounded border text-lg font-medium transition
          ${isPlusDisabled
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    }`}
            >
                +
            </button>
        </div>
    );
}

export default QuantityStepper;