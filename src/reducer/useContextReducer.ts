import { ContextReducerActionType, ContextReducerType } from './types';

export const useContextReducer = (state: ContextReducerType, { type, data }: ContextReducerActionType): ContextReducerType => {
  switch (type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...data,
        },
      };
    case 'UPDATE_TOKEN':
      return {
        ...state,
        tokens: {
          ...state.tokens,
          ...data,
        },
      };
    default:
      return { ...state };
  }
};
