import { useEffect, useState } from 'react';

const getSavedValue = (key, initialValue) => {
  const savedValue = JSON.parse(localStorage.getItem(key));

  // console.log('initial value = ', initialValue, '   saved value = ', savedValue);

  // allow 'false' as a valid value -- this does not work with 'toggle' methods, only 'set' methods
  if (savedValue !== undefined && savedValue !== null) return savedValue;

  return initialValue;
}

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
