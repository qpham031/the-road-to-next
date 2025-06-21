"use server";

import { cookies } from "next/headers";

export const getCookieByKey = async (key: string) => {
  return cookies().then((cookies) => cookies.get(key)?.value);
};

export const setCookieByKey = async (key: string, value: string) => {
  await cookies().then((cookies) => cookies.set(key, value));
};

export const deleteCookieByKey = async (key: string) => {
  await cookies().then((cookies) => cookies.delete(key));
};
