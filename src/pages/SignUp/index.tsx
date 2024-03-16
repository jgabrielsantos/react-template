import React from 'react';
import { Button } from 'awesome-gcl';
import { useSignup } from './useLogic';
import { Link, SignupForm } from '../../components';
import { SIGN_UP } from './const';

export const SignUp = () => {
  const hook = useSignup();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[470px] flex flex-col justify-center items-start">
        <h1 className="font-bold text-[32px] mb-[60px]">
          {SIGN_UP.TITLE}
        </h1>

        {hook.errors.default && (
          <div
            className='border-2 border-solid rounded-lg border-support-alert-50 bg-white-100 text-support-alert-50 p-4 mb-8 w-full text-center'
          >
            {hook.errors.default}
          </div>
        )}

        <SignupForm
          updateFormHandler={hook.updateFormHandler}
          createAccountState={hook.createAccountState}
          errors={hook.errors}
        />

        <Button
          size='large'
          type='button'
          theme='primary'
          handleClick={hook.createAccountHandler}
          additionalClasses={{
            button: ['w-full'],
          }}
        >
          {SIGN_UP.BUTTON.CREATE}
        </Button>

        <div className='flex gap-2 mt-6'>
          <p>{SIGN_UP.FOOTER_TEXT.LABEL}</p>
          <Link
            size='large'
            theme='primary'
            href={SIGN_UP.FOOTER_TEXT.LINK.URL}
          >
            {SIGN_UP.FOOTER_TEXT.LINK.LABEL}
          </Link>
        </div>
      </div>
    </div>
  );
};
