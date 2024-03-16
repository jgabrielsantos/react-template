import React, {
  createContext,
} from 'react';
import { ContextReducerActionType, ContextReducerType } from '../reducer';

type CacheContextTypes = {
  contextState: ContextReducerType
  contextDispatcher: React.Dispatch<ContextReducerActionType>
}

export const SystemContext = createContext<Readonly<CacheContextTypes>>({} as CacheContextTypes);
