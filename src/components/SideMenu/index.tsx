import React from 'react';
import {
  Button, Figure, User,
} from 'awesome-gcl';
import { useSideMenu } from './useLogic';
import { Link } from '../Link';
import { ICONS, IMAGES } from '../../utils';
import { SIDE_MENU } from './const';

export const SideMenu = () => {
  const hook = useSideMenu();

  return (
    <div
      className="flex flex-col h-screen w-[300px] border-e border-solid border-grayscale-10 px-3 py-4"
    >
      <div className="flex justify-between w-full mb-20">
        <Link
          href='/'
          size="medium"
          theme="primary"
        >
          <Figure
            alt={IMAGES.get('COMPANY_ICON').ALT}
            src={IMAGES.get('COMPANY_ICON').SRC}
          />
        </Link>
      </div>

      <div className="w-full min-h-3/4 max-h-3/4 h-full scrollhide pb-8 overflow-auto mb-10">
        <p> MENU ITEMS </p>
      </div>

      <div className='flex flex-col justify-end max-h-1/4 gap-8 '>
        <Button
          handleClick={hook.handleLogout}
          size='large'
          type='button'
          theme='tertiary'
          additionalClasses={{
            button: ['!justify-start', 'flex', 'gap-3', 'w-full', 'bg-zinc-100', 'border-zinc-100', 'hover:bg-zinc-300', 'hover:border-zinc-300'],
          }}
        >
          <Figure
            alt={ICONS.get('LOGOUT_ICON').ALT}
            src={ICONS.get('LOGOUT_ICON').SRC}
            additionalClasses={{
              figure: ['!w-6', '!h-6'],
            }}
          />
          {SIDE_MENU.BUTTONS.LOG_OUT}
        </Button>
        <User
          size="large"
          firstName={hook.hookCacheContextState.user.name.split(' ')[0] || ''}
          lastName={hook.hookCacheContextState.user.name.split(' ')[1] || ''}
          description={hook.hookCacheContextState.user.email || ''}
          additionalClasses={{
            wrapper: ['py-2'],
          }}
        />
      </div>
    </div>
  );
};
