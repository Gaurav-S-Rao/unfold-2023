// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

import Router from 'src/routes/sections';

import ThemeProvider from 'src/theme';
import { SettingsProvider } from './components/settings';
import { SnackbarProvider } from './components/snackbar';
import ProgressBar from './components/progress-bar';
import { AuthConsumer, AuthProvider } from './auth/context';

function App() {
  return (
    <AuthProvider>
      <SettingsProvider
        defaultSettings={{
          themeMode: 'light', // 'light' | 'dark'
          themeContrast: 'default', // 'default' | 'bold'
          themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
          themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
          themeStretch: false,
        }}
      >
        <ThemeProvider>
          <SnackbarProvider>
            <ProgressBar />
            <AuthConsumer>
              <Router />
            </AuthConsumer>
          </SnackbarProvider>
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
