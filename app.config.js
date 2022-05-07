export default {
  scheme: "karma",
  owner: "schmelman",
  name: "karma",
  slug: "karma",
  version: "1.0.1",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#44337A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    buildNumber: "1.0.1",
  },
  androidNavigationBar: {
    backgroundColor: "#44337A",
    barStyle: "light-content",
  },
  androidStatusBar: {
    backgroundColor: "#44337A",
    barStyle: "light-content",
  },
  android: {
    blockedPermissions: [],
    versionCode: 0,
  },
  plugins: ["expo-image-picker"],
};
