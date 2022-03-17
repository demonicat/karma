import { AndroidConfig, ConfigPlugin, withAndroidStyles } from "@expo/config-plugins";

const withFullScreenDialogStyles: ConfigPlugin = (config) => {
  return withAndroidStyles(config, async (config) => {
    config.modResults = await configureFullScreenDialog(config.modResults);
    return config;
  });
};

async function configureFullScreenDialog(
  styles: AndroidConfig.Resources.ResourceXML
): Promise<AndroidConfig.Resources.ResourceXML> {
  // Remove existing theme
  styles.resources.style = styles.resources.style!.filter(
    (style) => style.$.name !== "Theme.FullScreenDialog"
  );

  // 1A. You can build the XML object using the JS API
  const res = AndroidConfig.Resources.buildResourceGroup({
    parent: "AppTheme",
    name: "Theme.FullScreenDialog",
    items: [
      AndroidConfig.Resources.buildResourceItem({
        name: "android:windowNoTitle",
        value: "true",
      }),
      AndroidConfig.Resources.buildResourceItem({
        name: "android:windowIsFloating",
        value: "false",
      }),
      AndroidConfig.Resources.buildResourceItem({
        name: "android:windowBackground",
        value: "@android:color/transparent",
      }),
      AndroidConfig.Resources.buildResourceItem({
        name: "android:statusBarColor",
        value: "@android:color/transparent",
      }),
      AndroidConfig.Resources.buildResourceItem({
        name: "android:navigationBarColor",
        value: "#44337A",
      }),
    ],
  });

  // 2. Add the resource object to the styles to be written
  styles.resources.style.push(res);
  return styles;
}

module.exports = withFullScreenDialogStyles;
