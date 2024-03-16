import React from 'react';
import { AppWrapper, Link } from '../../components';
import { DASHBOARD } from './const';
import { useDashboard } from './useLogic';

export const Dashboard = () => {
  const hook = useDashboard();

  return (
    <AppWrapper>
      <header className="w-full flex items-center justify-between mt-3 mb-[60px]">
        <h1 className="text-[32px] font-bold">
          {hook.hookCacheContextState.user.userType === 'admin' ? DASHBOARD.TITLE_ADMIN : DASHBOARD.TITLE}
        </h1>
      </header>
      <div className="w-full flex items-start justify-between gap-8">
        <Link href='example' size='large' theme='primary'>Line</Link>
      </div>
    </AppWrapper>
  );
};
