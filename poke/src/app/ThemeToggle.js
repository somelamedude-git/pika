"use client";
import { useEffect, useState } from "react";
import useThemeStore from "@/store/themeStore";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center bg-yellow-100/10 border border-yellow-300 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg gap-4">
        <div
          onClick={() => setTheme(0)} // Morning
          className={`flex items-center gap-2 px-3 py-1 rounded-lg cursor-pointer transition-all duration-300 ${
            theme === 0 ? "bg-yellow-300 text-yellow-900" : "text-yellow-200 hover:bg-yellow-300/20"
          }`}
        >
          <Sun size={20} />
          <span className="text-sm font-semibold">Morning</span>
        </div>

        <div
          onClick={() => setTheme(1)} // Night
          className={`flex items-center gap-2 px-3 py-1 rounded-lg cursor-pointer transition-all duration-300 ${
            theme === 1 ? "bg-yellow-300 text-yellow-900" : "text-yellow-200 hover:bg-yellow-300/20"
          }`}
        >
          <Moon size={20} />
          <span className="text-sm font-semibold">Night</span>
        </div>
      </div>
    </div>
  );
}
