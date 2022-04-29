const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  scheme: "finyances",
  owner: "schmelman",
  name: IS_DEV ? "finyances (dev)" : "finyances",
  slug: "finyances",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon/icon.png",
  splash: {
    image: "./assets/splash/splash.png",
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
    package: IS_DEV ? "com.demonicat.finyancesdev" : "com.demonicat.finyances",
    versionCode: 1,
  },
};
