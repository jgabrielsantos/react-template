import React from 'react';
import { useUserRadio } from './logic';

export const UserRadio = () => {
  const hook = useUserRadio();

  return (
    <div className="flex items-center self-center">
      <label className="flex items-center justify-center ">
        <input
          type="radio"
          className="absolute opacity-0"
          value="applicant"
          checked={hook.selected === 'applicant'}
          onChange={(event) => hook.handleChange(event)}
        />
        <span className={`px-8 py-3 border-solid border rounded-l-md ${hook.selected === 'applicant' ? 'bg-primary-50 border-primary-50 text-white-100' : 'bg-white-100 border-grayscale-40 text-grayscale-100'}`}>
          Applicant
        </span>
      </label>
      <label className="flex items-center justify-center">
        <input
          type="radio"
          className="absolute opacity-0"
          value="admin"
          checked={hook.selected === 'admin'}
          onChange={(event) => hook.handleChange(event)}
        />
        <span className={`px-8 py-3 border-solid border rounded-r-md ${hook.selected === 'admin' ? 'bg-primary-50 border-primary-50 text-white-100' : 'bg-white-100 border-grayscale-40 text-grayscale-100'}`}>
          Admin
        </span>
      </label>
    </div>
  );
};
