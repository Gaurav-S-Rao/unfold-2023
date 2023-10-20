import ThemeProvider from "src/theme";
import { SettingsProvider } from "./settings";
import React from "react";

type props = {
  children: React.ReactNode;
};

function SuiReachProviderApp({ children }: props) {
  return (
    <SettingsProvider
      defaultSettings={{
        themeMode: "light", // 'light' | 'dark'
        themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
      }}
    >
      <ThemeProvider>{children}</ThemeProvider>
    </SettingsProvider>
  );
}

export default SuiReachProviderApp;
