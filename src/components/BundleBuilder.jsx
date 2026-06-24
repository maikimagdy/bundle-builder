import { useState } from "react";
import productsData from "../data/products.json";
import Builder from "./builder/Builder";
import ReviewPanel from "./review/ReviewPanel";
import { loadSavedSystem, saveSavedSystem } from "../hooks/useLocalStorage";

function BundleBuilder() {
    const { steps } = productsData;

    // ---------- Build initial state from JSON defaults ----------
    const buildInitialSelections = () => {
        const initial = {};
        steps.forEach((step) => {
            step.products.forEach((product) => {
                if (product.defaultQuantity > 0) {
                    const key = product.defaultVariant
                        ? `${product.id}__${product.defaultVariant}`
                        : product.id;
                    initial[key] = product.defaultQuantity;
                }
            });
        });
        return initial;
    };

    const buildInitialActiveVariants = () => {
        const initial = {};
        steps.forEach((step) => {
            step.products.forEach((product) => {
                if (product.variants && product.variants.length > 0) {
                    initial[product.id] =
                        product.defaultVariant || product.variants[0].id;
                }
            });
        });
        return initial;
    };

    // ---------- State (with localStorage check) ----------
    // On first render, check if a saved system exists; otherwise use defaults
    const [selections, setSelections] = useState(() => {
        const saved = loadSavedSystem();
        return saved?.selections ?? buildInitialSelections();
    });

    const [activeVariants, setActiveVariants] = useState(() => {
        const saved = loadSavedSystem();
        return saved?.activeVariants ?? buildInitialActiveVariants();
    });

    const [openStep, setOpenStep] = useState(() => {
        if (typeof window === "undefined") return 1;
        return window.innerWidth < 768 ? null : 1;
    });
    // ---------- Handlers ----------
    const updateQuantity = (productId, variantId, newQty) => {
        const key = variantId ? `${productId}__${variantId}` : productId;
        setSelections((prev) => {
            const next = { ...prev };
            if (newQty <= 0) {
                delete next[key];
            } else {
                next[key] = newQty;
            }
            return next;
        });
    };

    const setActiveVariant = (productId, variantId) => {
        setActiveVariants((prev) => ({ ...prev, [productId]: variantId }));
    };

    const toggleStep = (stepId) => {
        setOpenStep((prev) => (prev === stepId ? null : stepId));
    };

    // ---------- Save handler ----------
    const saveSystem = () => {
        const success = saveSavedSystem({ selections, activeVariants });
        return success; // true if saved, false if failed
    };

    // ---------- Render ----------
    return (
        <div className="mx-auto max-w-7xl px-4 py-6 bundle-builder-container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
                <Builder
                    steps={steps}
                    selections={selections}
                    activeVariants={activeVariants}
                    openStep={openStep}
                    updateQuantity={updateQuantity}
                    setActiveVariant={setActiveVariant}
                    toggleStep={toggleStep}
                />

                <ReviewPanel
                    steps={steps}
                    selections={selections}
                    activeVariants={activeVariants}
                    updateQuantity={updateQuantity}
                    saveSystem={saveSystem}
                />
            </div>
        </div>
    );
}

export default BundleBuilder;