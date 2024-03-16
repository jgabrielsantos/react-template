export const useSignupReducer = (state: any, { data }: Record<string, any>) => ({
  ...state,
  ...data,
});
