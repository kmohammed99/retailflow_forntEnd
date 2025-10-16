const KEY = "newOrderDraft";

export function loadDraft() {
    try {
        return JSON.parse(sessionStorage.getItem(KEY) || "{}");
    } catch {
        return {};
    }
}
export function saveDraft(patch) {
    const current = loadDraft();
    const next = { ...current, ...patch };
    sessionStorage.setItem(KEY, JSON.stringify(next));
    return next;
}
export function clearDraft() {
    sessionStorage.removeItem(KEY);
}