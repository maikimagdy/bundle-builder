function Badge({ text }) {
    if (!text) return null;

    return (
        <span className="inline-block bg-[#4E2FD2] text-white text-xs font-semibold px-2.5 py-1 rounded-full discount-badge">
            {text}
        </span>
    );
}

export default Badge;