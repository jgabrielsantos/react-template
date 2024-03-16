import React from 'react';
import { AppWrapper, Link } from '../../components';

export const Example = () => (
  <AppWrapper>
    <header className="w-full flex items-center justify-between mt-3 mb-[60px]">
      <h1 className="text-[32px] font-bold">Example page</h1>
    </header>
    <div className="w-full flex items-start justify-between gap-8">
      <Link href='/' size='large' theme='primary'>home</Link>

    </div>
  </AppWrapper>
);
