"use client";

import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const RedirectToast = () => {
  const pathName = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const toastIt = async () => {
      const message = await getCookieByKey("toast");
      if (!message) return;
      toast.success(message);
      await deleteCookieByKey("toast");
    };
    toastIt();
  }, [pathName]);
  return null;
};

export { RedirectToast };
