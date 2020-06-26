import { useCallback, useState } from 'react';

const useCustomRef = () => {
  const [nodeRef, setNodeRef] = useState(null);
  const updateNodeRef = useCallback((node) => {
    if (node !== null) {
      setNodeRef(node);
    }
  }, []);
  return [nodeRef, updateNodeRef];
};

export default useCustomRef;
