import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { PlayerState, GameState } from '../types/gameState';
import { initialPlayerState, initialGameState } from './initialState';

type GameContextType = {
  playerState: PlayerState;
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
};

type GameAction =
  | { type: 'UPDATE_PLAYER_STATE'; payload: Partial<PlayerState> }
  | { type: 'UPDATE_GAME_STATE'; payload: Partial<GameState> }
  | { type: 'RESET_GAME' };

const GameContext = createContext<GameContextType | undefined>(undefined);

const gameReducer = (state: { playerState: PlayerState; gameState: GameState }, action: GameAction) => {
  switch (action.type) {
    case 'UPDATE_PLAYER_STATE':
      const newPlayerState = { ...state.playerState, ...action.payload };
      localStorage.setItem('playerState', JSON.stringify(newPlayerState));
      return { ...state, playerState: newPlayerState };

    case 'UPDATE_GAME_STATE':
      return { ...state, gameState: { ...state.gameState, ...action.payload } };

    case 'RESET_GAME':
      localStorage.removeItem('playerState');
      return { playerState: initialPlayerState, gameState: initialGameState };

    default:
      return state;
  }
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, {
    playerState: initialPlayerState,
    gameState: initialGameState
  });

  useEffect(() => {
    const savedState = localStorage.getItem('playerState');
    if (savedState) {
      dispatch({
        type: 'UPDATE_PLAYER_STATE',
        payload: JSON.parse(savedState)
      });
    }
  }, []);

  return (
    <GameContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
