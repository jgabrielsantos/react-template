import { SignupBasicPropTypes } from '../../pages/SignUp/types';

export type SignupFormPropTypes = {
  createAccountState: SignupBasicPropTypes
  updateFormHandler: (value: Record<string, any>) => void
  errors: Record<string, string>
}
