import React from 'react';
import { Button, Input } from 'awesome-gcl';
import { useLogin } from './useLogic';
import { LOGIN } from './const';
import { Link } from '../../components';

export const Login = () => {
  const hook = useLogin();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[470px] flex flex-col justify-center items-start">
        <h1 className="font-bold text-[32px] mb-[60px]">{LOGIN.TITLE}</h1>
        {hook.errors.default && (
          <div
            className='border-2 border-solid rounded-lg border-support-alert-50 bg-white-100 text-support-alert-50 p-4 mb-8 w-full text-center'
          >
            {hook.errors.default}
          </div>
        )}
        <Input
          size='large'
          type='email'
          label={LOGIN.INPUTS.EMAIL.LABEL}
          value={hook.email}
          placeholder={LOGIN.INPUTS.EMAIL.PLACEHOLDER}
          onChange={(event) => hook.emailHandler(event)}
          caption={hook.errors.email}
          additionalClasses={{
            inputWrapper: ['w-full'],
            input: ['w-full'],
            caption: ['text-support-alert-50'],
          }}
        />
        <Input
          size='large'
          type='password'
          label={LOGIN.INPUTS.PASSWORD.LABEL}
          value={hook.password}
          placeholder={LOGIN.INPUTS.PASSWORD.PLACEHOLDER}
          onChange={(event) => hook.passwordHandler(event)}
          caption={hook.errors.password}
          onKeyDown={(event: any) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              hook.handleLogin();
            }
          }}
          additionalClasses={{
            wrapper: ['my-8'],
            inputWrapper: ['w-full'],
            input: ['w-full'],
            caption: ['text-support-alert-50'],
          }}

        />
        <Button
          size='large'
          type='button'
          theme='primary'
          handleClick={hook.handleLogin}
          additionalClasses={{
            button: ['w-full'],
          }}
        >
          {LOGIN.BUTTON.LOGIN}
        </Button>

        <div className='flex gap-2 mt-6'>
          <p>{LOGIN.FOOTER_TEXT.LABEL}</p>
          <Link
            size='large'
            theme='primary'
            href={LOGIN.FOOTER_TEXT.LINK.URL}
          >
            {LOGIN.FOOTER_TEXT.LINK.LABEL}
          </Link>
        </div>
      </div>
    </div>
  );
};
