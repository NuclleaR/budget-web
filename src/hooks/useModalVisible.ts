import { useCallback, useEffect, useState } from "react";

export function useModalVisible(
  visible: boolean,
  setVisible: (visible: boolean) => void,
) {
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    setLocalVisible(visible);
  }, [visible]);

  const afterLeave = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  return { localVisible, setLocalVisible, afterLeave } as const;
}
