import { UTILS } from "@/lib/utils";

export enum LocalStorageKeys {
    ACCESS_TOKEN = "access_token",
    REFRESH_TOKEN = "refresh_token",
}

const getFromLocalStorage = (key: LocalStorageKeys): string | null | object => {
    const value =  localStorage.getItem(key as unknown as string);
    return value ? UTILS.parseJSON(value) : null;
  } 

const setToLocalStorage = (key: LocalStorageKeys, value: string | object): void => {
    const stringValue = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key as unknown as string, stringValue);
} 

const removeFromLocalStorage = (key: LocalStorageKeys): void => {
    localStorage.removeItem(key as unknown as string);
}

const clearAllLocalStorage = (): void => {
    localStorage.clear();
}

export const localStorageService = {
    getItem: getFromLocalStorage,
    setItem: setToLocalStorage,
    removeItem: removeFromLocalStorage,
    clear: clearAllLocalStorage,
};
