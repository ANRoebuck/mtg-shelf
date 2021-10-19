import { useEffect, useState } from 'react';

const getSavedValue = (key, initialValue) => {
  return JSON.parse(localStorage.getItem(key)) || (initialValue instanceof Function && initialValue()) || initialValue;
}

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
