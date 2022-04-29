import { Instance, SnapshotOut, types } from "mobx-state-tree";

import { withEnvironment } from "../extensions/with-environment";

/**
 * User Store
 * Store values that doesn't change frequently
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    name: types.optional(types.string, ""),
    uid: types.optional(types.string, ""),
    email: types.optional(types.string, ""),
    picture: types.optional(types.string, ""),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setUser: ({
      name,
      id,
      email,
      picture,
    }: {
      name?: string;
      id?: string;
      email?: string;
      picture?: string;
    }) => {
      self.uid = id;
      self.name = name;
      self.email = email;
      self.picture = picture;
    },
  }))
  .actions((self) => ({
    getUser: async (accessToken: string) => {
      const response = await self.environment.api.getUserInfo(accessToken);

      if (response.kind === "ok") {
        self.setUser({
          name: response.data.name,
          id: response.data.id,
          email: response.data.email,
          picture: response.data.picture,
        });
      }
    },
  }));

type UserStoreType = Instance<typeof UserStoreModel>;
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>;
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = (): UserStoreType | object =>
  types.optional(UserStoreModel, {});
