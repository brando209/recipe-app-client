import { useCallback, useEffect, useState } from "react";

export default function useAsync(callback, dependencies = []) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(null);

  //TODO: Create custom hook which accepts dependencies array for useCallback which avoids exhaustive-deps warning
  /* eslint-disable react-hooks/exhaustive-deps */
  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(null);
    setValue(null);
    callback && typeof callback === "function" && callback()
      .then(setValue) 
      .catch(setError)
      .finally(() => setLoading(false));
  }, dependencies);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, value, setLoading, setError, setValue }
}