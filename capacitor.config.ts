import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.accounting.mentor',
  appName: 'مساعد المحاسبة',
  webDir: 'out',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: false,
    backgroundColor: '#FFFBFE',
  },
  server: {
    androidScheme: 'https',
  },
  plugins: {
    StatusBar: {
      style: 'DEFAULT',
      backgroundColor: '#FFFBFE',
    },
  },
};

export default config;
