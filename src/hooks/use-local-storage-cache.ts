import { useState, useEffect, useCallback } from "react";

interface CacheOptions {
  expirationTime?: number; // in milliseconds
  version?: string; // for cache invalidation
}

interface CachedData<T> {
  data: T;
  timestamp: number;
  version: string;
}

/**
 * Enhanced localStorage hook with caching and expiration
 * Automatically handles data persistence and cache invalidation
 * 
 * @param key - Storage key
 * @param initialValue - Initial value if no cache exists
 * @param options - Cache options (expiration, version)
 * 
 * @example
 * const [courses, setCourses] = useLocalStorageCache(
 *   "courses",
 *   [],
 *   { expirationTime: 5 * 60 * 1000, version: "1.0" }
 * );
 */
export const useLocalStorageCache = <T>(
  key: string,
  initialValue: T,
  options: CacheOptions = {}
): [T, (value: T | ((val: T) => T)) => void, () => void] => {
  const { expirationTime = 5 * 60 * 1000, version = "1.0" } = options;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      const cached: CachedData<T> = JSON.parse(item);
      
      // Check version mismatch
      if (cached.version !== version) {
        window.localStorage.removeItem(key);
        return initialValue;
      }

      // Check expiration
      const now = Date.now();
      if (now - cached.timestamp > expirationTime) {
        window.localStorage.removeItem(key);
        return initialValue;
      }

      return cached.data;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        setStoredValue(valueToStore);

        const cached: CachedData<T> = {
          data: valueToStore,
          timestamp: Date.now(),
          version,
        };

        window.localStorage.setItem(key, JSON.stringify(cached));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue, version]
  );

  const clearCache = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error clearing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, clearCache];
};
