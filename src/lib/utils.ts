import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const parseJSON = <T>(str: string): T | string => {
  try {
    return JSON.parse(str) as T
  } catch {
    return str as string;
  }
}

export const UTILS = {
  parseJSON,
}