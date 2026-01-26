'use client';

import { useEffect, useState } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);
    return { theme, toggleTheme };
};

export default useTheme;