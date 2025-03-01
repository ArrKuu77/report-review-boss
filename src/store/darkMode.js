import { create } from "zustand";

const useDarkMode = create((set) => ({
  isDarkMode:
    localStorage.getItem("dark") == null
      ? "false"
      : localStorage.getItem("dark"),
  SetDarkMode: () =>
    set((state) => ({
      isDarkMode: state.isDarkMode == "false" ? "true" : "false",
    })),
  SetLightMode: () =>
    set((state) => ({
      isDarkMode: state.isDarkMode == "true" ? "false" : "true",
    })),
}));

export default useDarkMode;
