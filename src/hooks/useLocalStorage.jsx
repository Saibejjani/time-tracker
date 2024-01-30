import { useState, useEffect } from "react";
const PREFIX = "time-tracker-";
const useLocalStorage = (key, intialvalue) => {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue) return JSON.parse(jsonValue);
    if (typeof intialvalue === "function") {
      return intialvalue();
    } else {
      return intialvalue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
};

export default useLocalStorage;
