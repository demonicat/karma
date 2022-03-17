import { Instance, SnapshotOut, types } from "mobx-state-tree";

import { ConstantStoreModel } from "../constant-store/constant-store";
import { UserStoreModel } from "../user-store/user-store";

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  constantStore: types.optional(ConstantStoreModel, {}),
  userStore: types.optional(UserStoreModel, {}),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
