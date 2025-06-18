import { ZodError } from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
};

export const fromErrorToActionState = (
  error: unknown,
  formData: FormData,
): ActionState => {
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: "",
      payload: formData,
      fieldErrors: error.flatten().fieldErrors,
    };
  }
  if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      payload: formData,
      fieldErrors: {},
    };
  }
  return {
    status: "ERROR",
    message: "Something went wrong",
    payload: formData,
    fieldErrors: {},
  };
};

export const toActionState = (
  status: ActionState["status"],
  message: string,
): ActionState => {
  return {
    status,
    message,
    fieldErrors: {},
  };
};
