import { useState } from "react";

export const useLocalStorage = (key: string, initialValue: string) => {
    const [storedValue, setStoredValue] = useState<string>(() => {
        if (typeof window === "undefined") {
            return initialValue ? initialValue : "";
        }

        const value = window.localStorage.getItem(key);
        return value ? value : initialValue;
    });

    const setValue = (value: string) => {
        if (typeof window === "undefined") {
            return;
        }

        window.localStorage.setItem(key, value);
        setStoredValue(value);
    };

    const removeValue = () => {
        if (typeof window === "undefined") {
            return;
        }

        window.localStorage.removeItem(key);
        setStoredValue("");
    };

    return { storedValue, setValue, removeValue };
};
