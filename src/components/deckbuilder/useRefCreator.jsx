import { useCallback, useState } from 'react';

const useRefCreator = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ref, setRef] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const updateRef = useCallback((node) => {
    if (node !== null) {
      setRef(node);
    }
  }, []);
  return [ref, updateRef];
};

export default useRefCreator;