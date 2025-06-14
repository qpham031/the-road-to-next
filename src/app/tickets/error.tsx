"use client";

import { PlaceHolder } from "@/components/placeholder";

export default function ErrorContent({ error }: { error: Error }) {
  return <PlaceHolder label={error.message} />;
}
