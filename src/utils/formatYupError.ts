export const formatYupError = (errors: { path: string, message: string }[]) => {
  const errorMessage: Record<string, string> = {};
  errors.forEach((error) => {
    if (!error) return;
    errorMessage[error.path] = error.message;
  });
  return errorMessage;
};
