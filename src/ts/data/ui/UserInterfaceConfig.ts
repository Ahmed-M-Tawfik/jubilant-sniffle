import type { IUserInterfaceConfig } from "../../ui/UserInterfaceConfigTypes";

export const USER_INTERFACE_CONFIG: IUserInterfaceConfig = {
  screen: {
    width: 800,
    height: 600,
  },

  fonts: {
    mainButtons: {
      fontFamily: "Sans-serif",
      fontSize: 30,
    },
  },

  colours: {
    primaryBackground: "#f0f0f0",
    primaryForeground: "#459aefff",
    primaryText: "#222",

    secondaryBackground: "#459aefff",
    secondaryText: "#eee",

    primary: "#459aefff",
    secondary: "#001d3aff",
    background: "#ffffff",
    surface: "#f5f5f5",
    textPrimary: "#000000",
    textSecondary: "#666666",
    error: "#d32f2f",
    warning: "#ffa000",
    success: "#388e3c",
    info: "#1976d2",
  },
};
