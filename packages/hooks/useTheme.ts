'use client';

import { useEffect, useState } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);
    return { theme, toggleTheme };
};

export default useTheme;