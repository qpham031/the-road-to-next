"use client";

import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  label: string;
};

const SubmitButton = ({ label }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      size="lg"
      className="cursor-pointer"
    >
      {pending && <LucideLoaderCircle className="mr-2 size-4 animate-spin" />}
      {label}
    </Button>
  );
};

export { SubmitButton };
