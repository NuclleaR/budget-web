import { useCallback, useEffect, useState } from "react";

export function useModalVisible(
  visible: boolean,
  setVisible: (visible: boolean) => void,
) {
  useEffect(() => {
    setLocalVisible(visible);
  }, [visible]);

  const [localVisible, setLocalVisible] = useState(visible);

  const [okEnabled, setOkEnabled] = useState(false);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!localVisible) {
      setOkEnabled(false);
      setLoading(false);
    }
  }, [localVisible]);

  const afterLeave = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  return {
    localVisible,
    setLocalVisible,
    afterLeave,
    okEnabled,
    setOkEnabled,
    isLoading,
    setLoading,
  } as const;
}
