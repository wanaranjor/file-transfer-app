import { writable } from "svelte/store";

const userProfileData = () => {
  const { subscribe, update, set } = writable({})
  return {
    subscribe,
    update: (userData) => update(() => userData),
    set: (userData) => set(userData),
    reset: () => set({})
  }
};

export const userProfile = userProfileData()