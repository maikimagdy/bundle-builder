
const STORAGE_KEY = "bundle-builder-saved-system";


export function loadSavedSystem() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (err) {
        console.warn("Failed to load saved system:", err);
        return null;
    }
}


export function saveSavedSystem(data) {
    try {
        const payload = {
            ...data,
            savedAt: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        return true;
    } catch (err) {
        console.warn("Failed to save system:", err);
        return false;
    }
}


export function clearSavedSystem() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
        console.warn("Failed to clear saved system:", err);
    }
}