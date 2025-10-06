import { useQuery, UseQueryOptions } from "@tanstack/react-query";

/**
 * Enhanced query hook with optimized caching
 * Wraps React Query with smart defaults for better performance
 * 
 * @param key - Query key for caching
 * @param fn - Query function that fetches data
 * @param options - Additional React Query options
 * 
 * @example
 * const { data, isLoading } = useQueryCache(
 *   ["courses", userId],
 *   () => fetchUserCourses(userId),
 *   { staleTime: 10 * 60 * 1000 } // 10 minutes
 * );
 */
export const useQueryCache = <TData = unknown, TError = Error>(
  key: string[],
  fn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">
) => {
  return useQuery<TData, TError>({
    queryKey: key,
    queryFn: fn,
    staleTime: 5 * 60 * 1000, // 5 minutes default
    gcTime: 30 * 60 * 1000, // 30 minutes default
    refetchOnWindowFocus: false,
    retry: 1,
    ...options,
  });
};
