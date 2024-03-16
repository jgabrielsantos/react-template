import { useState } from 'react';

export const useUserRadio = () => {
  const [selected, setSelected] = useState('applicant');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
  };

  return {
    selected,
    handleChange,
  };
};
