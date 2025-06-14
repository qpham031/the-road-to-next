"use client";

import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      className="cursor-pointer"
      variant="outline"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <LucideSun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <LucideMoon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
};

export { ThemeSwitcher };
