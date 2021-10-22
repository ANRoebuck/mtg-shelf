import { useEffect, useState } from "react";

const useStateWithCallback = (inistialSate, callback) => {
  const [state, setState] = useState(inistialSate);

  useEffect(() => {
    callback(state)
  }, [state, callback]);

  return [state, setState];
}

export default useStateWithCallback;
