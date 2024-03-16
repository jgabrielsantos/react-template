export type LoginReducerTypes = {
  email: string;
  password: string;
  errors: Record<string, string>;
};

export type LoginReducerActions =
  | { type: 'UPDATE_EMAIL'; data: string }
  | { type: 'UPDATE_PASSWORD'; data: string }
  | { type: 'UPDATE_ERRORS'; data: Record<string, string> };

export const useLoginReducer = (status: LoginReducerTypes, { type, data }: LoginReducerActions): LoginReducerTypes => {
  switch (type) {
    case 'UPDATE_EMAIL':
      return { ...status, email: data };
    case 'UPDATE_PASSWORD':
      return { ...status, password: data };
    case 'UPDATE_ERRORS':
      return { ...status, errors: data };
    default:
      return status;
  }
};
