import { toast } from "sonner";
import {
  type UseActionFeedBackOptions,
  useActionFeedback,
} from "./hooks/use-action-feedback";
import type { ActionState } from "./utils/to-action-state";

const options: UseActionFeedBackOptions = {
  onSuccess: ({ actionState }) => {
    if (actionState.message) {
      toast.success(actionState.message);
    }
  },
  onError: ({ actionState }) => {
    if (actionState.message) {
      toast.error(actionState.message);
    }
  },
};

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};

const Form = ({
  action,
  actionState,
  children,
  onSuccess,
  onError,
}: FormProps) => {
  const options: UseActionFeedBackOptions = {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }
      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
      onError?.(actionState);
    },
  };
  useActionFeedback(actionState, options);

  return (
    <form action={action} className="flex flex-col gap-y-2">
      {children}
    </form>
  );
};

export { Form };
