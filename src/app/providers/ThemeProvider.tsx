import { useEffect, type PropsWithChildren } from 'react';


const DEFAULTS = {
    primary: '#111827',
    accent: '#f59e0b',
};


export default function ThemeProvider({ children }: PropsWithChildren) {
    useEffect(() => {
        const r = document.documentElement;
        r.style.setProperty('--brand-primary', DEFAULTS.primary);
        r.style.setProperty('--brand-accent', DEFAULTS.accent);
    }, []);
    return <>{children}</>;
}