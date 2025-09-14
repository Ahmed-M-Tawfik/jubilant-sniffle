export interface IUserInterfaceConfig {
  screen: {
    width: number;
    height: number;
  };

  fonts: {
    mainButtons: {
      fontFamily: string;
      fontSize: number;
    };
  };

  colours: {
    primaryBackground: string;
    primaryForeground: string;
    primaryText: string;

    secondaryBackground: string;
    secondaryText: string;

    primary: string;
    secondary: string;
    background: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
}

export interface IKeyBinding {
  action: string;
  key: string;
  group: string;
}

export const playerActions = {
  player1: {
    moveLeft: "p1moveLeft",
    moveRight: "p1moveRight",
    moveUp: "p1moveUp",
    moveDown: "p1moveDown",
  },
  player2: {
    moveLeft: "p2moveLeft",
    moveRight: "p2moveRight",
    moveUp: "p2moveUp",
    moveDown: "p2moveDown",
  },
};
