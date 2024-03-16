import React from 'react';
import { Input } from 'awesome-gcl';
import { SignupBasicPropTypes } from '../../pages/SignUp/types';
import { SIGN_UP_FORM } from './const';

type SignupFormPropTypes = {
  createAccountState: SignupBasicPropTypes
  updateFormHandler: (value: Record<string, any>) => void
  errors: Record<string, string>
}

export const SignupForm = ({
  updateFormHandler, createAccountState, errors,
}: SignupFormPropTypes) => (
  <div className="grid grid-cols-2 gap-x-4 gap-y-8 mb-8">
    <Input
      size='large'
      type='text'
      label={SIGN_UP_FORM.FIRST_NAME.LABEL}
      value={createAccountState.firstName}
      placeholder={SIGN_UP_FORM.FIRST_NAME.PLACEHOLDER}
      onChange={(event) => updateFormHandler({
        firstName: event.target.value,
      })}
      caption={errors.firstName}
      additionalClasses={{
        inputWrapper: ['w-full'],
        input: [errors.firstName ? 'w-full border-support-alert-50' : 'w-full'],
        caption: ['text-support-alert-50'],
      }}

    />
    <Input
      size='large'
      type='text'
      label={SIGN_UP_FORM.LAST_NAME.LABEL}
      value={createAccountState.lastName}
      placeholder={SIGN_UP_FORM.LAST_NAME.PLACEHOLDER}
      onChange={(event) => updateFormHandler({
        lastName: event.target.value,
      })}
      caption={errors.lastName}
      additionalClasses={{
        inputWrapper: ['w-full'],
        input: [errors.lastName ? 'w-full border-support-alert-50' : 'w-full'],
        caption: ['text-support-alert-50'],
      }}
    />

    <Input
      size='large'
      type='email'
      label={SIGN_UP_FORM.EMAIL.LABEL}
      value={createAccountState.email}
      placeholder={SIGN_UP_FORM.EMAIL.PLACEHOLDER}
      onChange={(event) => updateFormHandler({
        email: event.target.value,
      })}
      caption={errors.email}
      additionalClasses={{
        wrapper: ['col-span-2'],
        inputWrapper: ['w-full'],
        input: [errors.email ? 'w-full border-support-alert-50' : 'w-full'],
        caption: ['text-support-alert-50'],
      }}
    />

    <Input
      size='large'
      type='password'
      label={SIGN_UP_FORM.PASSWORD.LABEL}
      value={createAccountState.password}
      placeholder={SIGN_UP_FORM.PASSWORD.PLACEHOLDER}
      onChange={(event) => updateFormHandler({
        password: event.target.value,
      })}
      caption={errors.password}
      additionalClasses={{
        wrapper: ['col-span-2'],
        inputWrapper: ['w-full'],
        input: [errors.password ? 'w-full border-support-alert-50' : 'w-full'],
        caption: ['text-support-alert-50'],
      }}
    />
  </div>
);
