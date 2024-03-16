export type ContextReducerType = {
  user: {
    id: string
    email: string
    name: string
    createdAt: string
  },
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

export type ContextReducerActionType = { type: 'UPDATE_USER', data: Pick<ContextReducerType, 'user'> }
| { type: 'UPDATE_TOKEN', data: Pick<ContextReducerType, 'tokens'> }
