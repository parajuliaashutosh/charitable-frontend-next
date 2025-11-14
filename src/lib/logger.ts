/* eslint-disable @typescript-eslint/no-explicit-any */

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'PRODUCTION';


const info = (...args: any[]) => {
  if (!isProduction && typeof window !== 'undefined') {
    console.info(...args);
  }
};

const error = (...args: any[]) => {
  if (!isProduction && typeof window !== 'undefined') {
    console.error(...args);
  }
};

const warn = (...args: any[]) => {
  if (!isProduction && typeof window !== 'undefined') {
    console.warn(...args);
  }
};

export const logger = {
    log: info,
    error,
    warn,
};