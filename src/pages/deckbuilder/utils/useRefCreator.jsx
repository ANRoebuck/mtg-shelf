import { useCallback, useState } from 'react';

const useRefCreator = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [containerRef, setContainerRef] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const updateContainerRef = useCallback((node) => {
    if (node !== null) {
      setContainerRef(node);
    }
  }, []);
  return [containerRef, updateContainerRef];
};

export default useRefCreator;
