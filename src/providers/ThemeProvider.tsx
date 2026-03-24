"use client";

import { FC } from "react";
import {
  ThemeProvider as ThemeProviderNext,
  ThemeProviderProps,
} from "next-themes";

const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => {
  return (
    <ThemeProviderNext
      enableSystem
      defaultTheme="dark"
      attribute={"class"}
      {...props}
    >
      {children}
    </ThemeProviderNext>
  );
};

export default ThemeProvider;
