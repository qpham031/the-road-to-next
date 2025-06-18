import { useEffect, useRef } from "react";
import type { ActionState } from "../utils/to-action-state";

type OnArgs = {
  actionState: ActionState;
};

export type UseActionFeedBackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

export const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedBackOptions,
) => {
  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }
    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }
  }, [actionState, options]);
};
