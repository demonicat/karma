import I18n from "i18n-js";
import { Instance, SnapshotOut, types } from "mobx-state-tree";

import { withEnvironment } from "../extensions/with-environment";

/**
 * Constant Store
 * Store values that doesn't change frequently
 */
export const ConstantStoreModel = types
  .model("ConstantStore")
  .props({
    colorMode: types.optional(types.union(types.literal("light"), types.literal("dark")), "light"),
    language: types.optional(types.string, "en"),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    changeColorMode: (colorMode: "dark" | "light") => {
      self.colorMode = colorMode;
    },
    changeLanguage: (languageCode: string) => {
      I18n.locale = languageCode;
      self.language = languageCode;
    },
  }));

type ConstantStoreType = Instance<typeof ConstantStoreModel>;
export interface ConstantStore extends ConstantStoreType {}
type ConstantStoreSnapshotType = SnapshotOut<typeof ConstantStoreModel>;
export interface ConstantStoreSnapshot extends ConstantStoreSnapshotType {}
export const createConstantStoreDefaultModel = (): ConstantStoreType | object =>
  types.optional(ConstantStoreModel, {});
