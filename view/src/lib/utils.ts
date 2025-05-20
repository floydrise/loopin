import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getSession } from "@/lib/auth_client.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const beforeLoadAuth = async () => {
  const { data } = await getSession();
  return data;
};
