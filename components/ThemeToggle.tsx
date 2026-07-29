"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const isDark = storedTheme ? storedTheme === "dark" : true;
    setDark(isDark);
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    document.documentElement.setAttribute("data-theme", newDark ? "dark" : "light");
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <button className="theme-btn" id="themeBtn" onClick={toggleTheme}>
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
