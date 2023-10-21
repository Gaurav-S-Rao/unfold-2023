import ThemeProvider from "src/theme";
import { SettingsProvider } from "./settings";
import React from "react";
import { ReachDataProvider } from "./reach-data/context";

type props = {
  children: React.ReactNode;
  clientId?: string;
};

function ReachProviderApp({ children, clientId }: props) {
  return (
    <ReachDataProvider id={clientId}>
      <SettingsProvider
        defaultSettings={{
          themeMode: "light", // 'light' | 'dark'
          themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
        }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </SettingsProvider>
    </ReachDataProvider>
  );
}

export default ReachProviderApp;
