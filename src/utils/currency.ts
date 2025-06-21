import { MyBig } from "@/lib/big";

export const toCent = (dollars: number) => {
  return new MyBig(dollars).mul(100).round(2).toNumber();
};

export const fromCent = (cents: number) => {
  return new MyBig(cents).div(100).round(2).toNumber();
};

export const currencyFromCent = (cents: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(fromCent(cents));
};
