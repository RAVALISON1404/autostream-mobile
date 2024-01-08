import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'autostream-mobile',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
