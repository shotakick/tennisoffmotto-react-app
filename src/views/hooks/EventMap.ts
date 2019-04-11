import { useCallback, useState } from 'react';

export const useEventInfoWindowControl = () => {
  const [openedMarkerKey, setKey] = useState<string | null>(null);

  const closeWindow = useCallback(() => setKey(null), [setKey]);

  const toggleWindow = useCallback(
    (key: string) => setKey(prev => (prev === key ? null : key)),
    [setKey]
  );

  return { openedMarkerKey, closeWindow, toggleWindow };
};
