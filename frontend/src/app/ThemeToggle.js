"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Importing icons for sun and moon

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Set the theme from localStorage if available
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    // Store the theme in localStorage whenever it changes
    if (theme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      style={{
        padding: "10px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      {theme === "light" ? (
        <FaMoon size={24} color="#111827" /> // Moon icon for light mode
      ) : (
        <FaSun size={24} color="#fff" /> // Sun icon for dark mode
      )}
    </button>
  );
}
